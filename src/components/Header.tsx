import { MenuIcon, SearchIcon, XIcon } from "lucide-react";
import { KeyboardEvent, memo, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import logo from "@/assets/movix-logo.svg";
import ContentWrapper from "@/components/ContentWrapper";

import { focusMainSearch } from "@/app/router/pages/home/hero/HeroBanner";
import { useInputRef } from "@/hooks/useInputRef";
import { useSearchClickHandler } from "@/hooks/useSearchClickHandler";
import { setQuery } from "@/store/reducers/search-slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import SearchInput from "./shared/SearchInput";

import { useApi } from "@/hooks/useApi";
import { useDebounce } from "@/hooks/useDebounce";
import useFilteredSearchData from "@/hooks/useFilteredSearchData";
import { useScrollEvent } from "@/hooks/useScrollEvent";
import "@/styles/scss/other/components/header.scss";
import Spinner from "./Spinner";
import SearchResults from "./shared/SearchResults";

type Props = {
  setShowPopupSearch: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ setShowPopupSearch }: Props) => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [hideSearchIcon, setHideSearchIcon] = useState(false);
  const { query } = useAppSelector((state) => state.search);
  const { isMobile } = useAppSelector((state) => state.device);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const { ref: searchRef, focus: focusSearch } = useInputRef();
  const { ref: topSearchRef } = useInputRef();

  const searchClickHandler = useSearchClickHandler(query, topSearchRef);

  // custom hook to debounce query
  const debouncedQuery = useDebounce(query);

  const { data, isError, isLoading } = useApi(
    `/search/multi?query=${debouncedQuery}&page=1`,
    [`query=${debouncedQuery}`]
  );

  // custom hook to filter search data
  const searchData = useFilteredSearchData(data)?.searchData;

  const searchMobileClickHandler = useCallback(() => {
    setShowSearch(false);
    setHideSearchIcon(false);
    document.body.classList.remove("overflow-hidden");
    searchClickHandler();
  }, [searchClickHandler, setShowSearch, setHideSearchIcon]);

  // scroll to top when location changes, unhide search icon, hide search bar
  useEffect(
    useCallback(() => {
      window.scrollTo(0, 0);
      setTimeout(() => {
        setShowSearch(false);
        setHideSearchIcon(false);
      }, 100);
    }, [setShowSearch, setHideSearchIcon]),
    [location]
  );

  const controlNavbar = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 200) {
      if (currentScrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    // if mobile menu is open, close it, unhide search icon and enable scrolling
    if (mobileMenu) {
      setMobileMenu(false);
      setHideSearchIcon(false);
      document.body.classList.remove("overflow-hidden");
    }

    // set the last scroll position
    setLastScrollY(currentScrollY);
  }, [lastScrollY, setLastScrollY, mobileMenu, setShow]);

  // add scroll event listener using custom hook
  useScrollEvent(controlNavbar);

  const toggleSearch = useCallback(() => {
    setMobileMenu(false);
    // if scroll is at the top and location is home, focus the main search input
    // else focus the search input in the header and stop scrolling
    if (lastScrollY < 200 && location.pathname === "/" && isMobile) {
      focusMainSearch();
    } else {
      setShowSearch(true);
      setHideSearchIcon(true);
      document.body.classList.add("overflow-hidden");
      setTimeout(() => focusSearch(), 100);
    }
  }, [setShowSearch, focusSearch, lastScrollY, location.pathname]);

  const openMobileMenu = useCallback(() => {
    setMobileMenu(true);
    setShowSearch(false);
    setHideSearchIcon(false);
    document.body.classList.remove("overflow-hidden");
  }, [setMobileMenu, setShowSearch, setHideSearchIcon]);

  const searchQueryHandler = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (e.key === "Enter" && debouncedQuery.length > 0) {
        navigate(`/search/${debouncedQuery}`);
        setShowSearch(false);
        setHideSearchIcon(false);
      }
    },
    [debouncedQuery, navigate, setShowSearch]
  );

  const searchResultClickHandler = useCallback(
    (item: any) => {
      navigate(`/${item.media_type}/${item.id}`);
      setShowPopupSearch(false);
    },
    [navigate, setShowPopupSearch]
  );

  // memoization doesn't work here!
  const clearSearch = () => {
    if (query.length === 0) {
      setShowSearch(false);
      setHideSearchIcon(false);
    } else {
      dispatch(setQuery(""));
      setTimeout(() => searchRef.current?.focus(), 50);
    }
  };

  const showDesktopSearchOnClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      e.preventDefault();
      setShowPopupSearch(true);
    },
    [setShowPopupSearch]
  );

  const popupClickHandler = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (e.target === e.currentTarget) {
        setShowSearch(false);
        setHideSearchIcon(false);
        document.body.classList.remove("overflow-hidden");
      }
    },
    [setShowSearch, setHideSearchIcon]
  );

  const navigationHandler = useCallback(
    (route: string, isLogo = false) => {
      if (isLogo) {
        navigate("/");
        setMobileMenu(false);
        document.body.classList.remove("overflow-hidden");
        return;
      }
      navigate(`/explore/${route}`);
      setMobileMenu(false);
    },
    [navigate, setMobileMenu]
  );

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={() => navigationHandler("/", true)}>
          <img src={logo} alt="" />
        </div>

        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandler("movie")}>
            Movies
          </li>
          <li className="menuItem" onClick={() => navigationHandler("tv")}>
            TV Shows
          </li>
          <li
            className={`ml-5 flex flex-row ${mobileMenu ? "hidden" : "block"}`}
          >
            <div
              className={`w-48 cursor-pointer rounded-3xl bg-gray-300 bg-opacity-30 px-3 py-[0.4rem] text-base text-gray-100 placeholder-slate-100 outline-none`}
              onClick={showDesktopSearchOnClick}
            >
              {"(Ctrl + K) to Search"}
            </div>

            <div onClick={showDesktopSearchOnClick}>
              <SearchIcon className="mx-1 mt-1 cursor-pointer text-white hover:text-[#da2f68]" />
            </div>
          </li>
        </ul>

        <div className="mobileMenuItems">
          {!hideSearchIcon && <SearchIcon onClick={toggleSearch} />}
          {mobileMenu ? (
            <XIcon onClick={() => setMobileMenu(false)} />
          ) : (
            <MenuIcon onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>

      {showSearch && (
        <div
          className={`searchBar !text-gray-700 opacity-95 backdrop-blur-3xl`}
        >
          <ContentWrapper>
            <SearchInput
              inputClassName="!text-lg"
              placeholder="Search a movie or tv show..."
              query={query}
              setQuery={(query: string) => dispatch(setQuery(query))}
              searchQueryHandler={searchQueryHandler}
              ref={searchRef}
            >
              <button type="button" onClick={searchMobileClickHandler}>
                <SearchIcon />
              </button>
              <button type="button" onClick={clearSearch}>
                <XIcon />
              </button>
            </SearchInput>
          </ContentWrapper>

          <div className={`popup-container`} onClick={popupClickHandler}>
            <Spinner
              initial={false}
              className={`absolute left-1/2 top-1/4 ${
                !isLoading && !isError ? "hidden" : "block"
              }`}
            />
            {!isLoading &&
              !isError &&
              searchData &&
              searchData?.length !== 0 && (
                <div
                  className={`popup absolute top-[5.35rem] flex w-[97%] flex-col items-center rounded-3xl border-[0.1rem] border-blue-300 bg-gray-900 text-gray-200`}
                >
                  <SearchResults
                    searchData={searchData}
                    searchResultHandler={searchResultClickHandler}
                  />
                </div>
              )}
          </div>
        </div>
      )}
    </header>
  );
};

export default memo(Header);
