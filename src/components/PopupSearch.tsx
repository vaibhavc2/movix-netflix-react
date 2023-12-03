import { useDebounce } from "@/hooks/useDebounce";
import { setQuery } from "@/store/reducers/search-slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import "@/styles/scss/other/components/popup-search.scss";
import { XIcon } from "lucide-react";
import React, { KeyboardEvent, memo } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "./shared/SearchInput";

type Props = {
  setShowPopupSearch: React.Dispatch<React.SetStateAction<boolean>>;
};

const PopupSearch = ({ setShowPopupSearch }: Props) => {
  const searchRef = React.useRef<HTMLInputElement>(null);
  const { query } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();
  const debouncedQuery = useDebounce(query, 500);

  const navigate = useNavigate();

  const searchQueryHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.key === "Enter" && debouncedQuery.length > 0) {
      navigate(`/search/${debouncedQuery}`);
      setShowPopupSearch(false);
    }
  };

  return (
    <>
      <div
        className="popup-container"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setShowPopupSearch(false);
          }
        }}
      >
        <div className="popup rounded-full border-2 border-blue-300 bg-gray-900 text-gray-200">
          <SearchInput
            placeholder="Search for a movie or tv show..."
            inputClassName="w-[30rem] bg-gray-900 text-xl text-blue-200 outline-none"
            ref={searchRef}
            query={query}
            autoFocus
            setQuery={(query: string) => dispatch(setQuery(query))}
            searchQueryHandler={searchQueryHandler}
            onlyInput
          />
          <button type="button" onClick={() => setShowPopupSearch(false)}>
            <XIcon className="mb-[-4px] scale-75" />
          </button>
        </div>
      </div>
    </>
  );
};

export default memo(PopupSearch);
