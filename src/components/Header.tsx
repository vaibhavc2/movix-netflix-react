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

import { useScrollEvent } from "@/hooks/useScrollEvent";
import "@/styles/scss/other/components/header.scss";

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

  const searchMobileClickHandler = useCallback(() => {
    setShowSearch(false);
    setHideSearchIcon(false);
    searchClickHandler();
  }, [searchClickHandler]);

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
    // show the search bar and hide the search icon when scroll event is triggered
    setShowSearch(false);
    setHideSearchIcon(false);
    // set the last scroll position
    setLastScrollY(currentScrollY);
  }, [lastScrollY, setLastScrollY, mobileMenu, setShow]);

  // add scroll event listener using custom hook
  useScrollEvent(controlNavbar);

  const toggleSearch = useCallback(() => {
    setMobileMenu(false);
    // if scroll is at the top and location is home, focus the main search input
    // else focus the search input in the header
    if (lastScrollY < 200 && location.pathname === "/" && isMobile) {
      focusMainSearch();
    } else {
      // setShowSearch((prev) => !prev);
      setShowSearch(true);
      setHideSearchIcon(true);
      setTimeout(() => focusSearch(), 100);
    }
  }, [setShowSearch, focusSearch, lastScrollY, location.pathname]);

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
    setHideSearchIcon(false);
  };

  const searchQueryHandler = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (e.key === "Enter" && query.length > 0) {
        navigate(`/search/${query}`);
      }
    },
    [query, navigate, setShowSearch]
  );

  const navigationHandler = (route: string) => {
    navigate(`/explore/${route}`);
    setMobileMenu(false);
  };

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={() => navigate("/")}>
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
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                if (e.target === e.currentTarget) setShowPopupSearch(true);
              }}
            >
              {"(Ctrl + K) to Search"}
            </div>

            <SearchIcon
              className="mx-1 mt-1 cursor-pointer text-white hover:text-[#da2f68]"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setShowPopupSearch(true);
              }}
            />
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
        <div className={`searchBar !text-gray-700`}>
          <ContentWrapper>
            <SearchInput
              className="backdrop-blur"
              placeholder="Search for a movie or tv show..."
              query={query}
              setQuery={(query: string) => dispatch(setQuery(query))}
              searchQueryHandler={searchQueryHandler}
              ref={searchRef}
            >
              <button type="button" onClick={searchMobileClickHandler}>
                <SearchIcon />
              </button>
              <XIcon
                onClick={() => {
                  setShowSearch(false);
                  setHideSearchIcon(false);
                }}
              />
            </SearchInput>
          </ContentWrapper>

          <ContentWrapper>
            {/* <Spinner
          initial={false}
          className={`absolute left-1/2 top-[35rem] ${
            !isLoading && !isError ? "hidden" : "block"
          }`}
        /> */}
            <div
              className={`popup absolute top-[27rem] flex flex-col items-center rounded-3xl border-2 border-blue-300 bg-gray-900 text-gray-200 ${
                !isLoading && !isError && data?.results?.length > 0
                  ? "block"
                  : "hidden"
              }`}
            >
              {!isLoading &&
                !isError &&
                data?.results?.length > 0 &&
                searchData?.map((item: any, index: number) => {
                  if (index > 4) return null;

                  return (
                    <div
                      key={String(index) + "-" + String(item.id)}
                      className="popup-item w-full cursor-pointer"
                      onClick={() => {
                        navigate(`/${item.media_type}/${item.id}`);
                        setShowPopupSearch(false);
                      }}
                    >
                      <div
                        className={`flex w-full items-center border-gray-600 py-3 ${
                          data?.results?.length > 4 && index > 0
                            ? "border-t-2"
                            : ""
                        }`}
                      >
                        <LazyImg
                          src={`${url.poster}${item.poster_path}`}
                          alt={item.title || item.name}
                          fallbackSrc={PosterFallback}
                          className="w-10 shadow-md shadow-slate-100 transition-all"
                          width={"2.5rem"}
                        />
                        <div className="popup-item__info ml-5">
                          <div className="popup-item__info__title text-lg hover:underline">
                            {item.name || item.title}
                          </div>
                          <div className="popup-item__info__type text-xs hover:underline">
                            {item.media_type === "movie"
                              ? "(Movie)"
                              : "(TV Show)"}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default memo(Header);
