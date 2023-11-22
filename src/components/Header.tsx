import { MenuIcon, SearchIcon, XIcon } from "lucide-react";
import { KeyboardEvent, memo, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import logo from "@/assets/movix-logo.svg";
import ContentWrapper from "@/components/ContentWrapper";

import { focusMainSearch } from "@/app/router/pages/home/hero/HeroBanner";
import { useInputRef } from "@/hooks/useInputRef";
import { useSearchClickHandler } from "@/hooks/useSearchClickHandler";
import SearchInput from "./shared/SearchInput";

import "@/styles/scss/other/components/header.scss";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { ref: searchRef, focus: focusSearch } = useInputRef();
  const { ref: topSearchRef } = useInputRef();

  const searchClickHandler = useSearchClickHandler(query, topSearchRef);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

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

    setLastScrollY(currentScrollY);
  }, [lastScrollY, setLastScrollY, mobileMenu, setShow]);

  useEffect(
    useCallback(() => {
      window.addEventListener("scroll", controlNavbar);
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }, [lastScrollY, setLastScrollY, controlNavbar]),
    [lastScrollY]
  );

  const toggleSearch = useCallback(() => {
    setMobileMenu(false);
    // if scroll is at the top and location is home, focus the main search input
    // else focus the search input in the header
    if (lastScrollY < 200 && location.pathname === "/") {
      focusMainSearch();
    } else {
      setShowSearch((prev) => !prev);
      setTimeout(() => focusSearch(), 100);
    }
  }, [setShowSearch, focusSearch, lastScrollY, location.pathname]);

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const searchQueryHandler = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (e.key === "Enter" && query.length > 0) {
        navigate(`/search/${query}`);
        setTimeout(() => setShowSearch(false), 100);
      }
    },
    [query, navigate, setShowSearch, setQuery]
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
            <input
              type="text"
              className={`w-48 rounded-3xl bg-gray-300 bg-opacity-30 px-3 py-[0.4rem] text-base text-gray-100 placeholder-slate-100 outline-none`}
              placeholder="Search ..."
              onChange={(e) => setQuery(e.currentTarget.value)}
              onKeyUp={(e) => searchQueryHandler(e)}
              ref={topSearchRef}
            />

            <SearchIcon
              className="mx-1 mt-1 text-white hover:text-[#da2f68]"
              onClick={searchClickHandler}
            />
          </li>
        </ul>

        <div className="mobileMenuItems">
          <SearchIcon onClick={toggleSearch} />
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
              setQuery={setQuery}
              searchQueryHandler={searchQueryHandler}
              inputRef={searchRef}
            >
              <XIcon onClick={() => setShowSearch(false)} />
            </SearchInput>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default memo(Header);
