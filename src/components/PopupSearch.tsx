import "@/styles/scss/other/components/popup-search.scss";
import { XIcon } from "lucide-react";
import React, { KeyboardEvent, memo } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  setShowPopupSearch: React.Dispatch<React.SetStateAction<boolean>>;
};

const PopupSearch = ({ setShowPopupSearch }: Props) => {
  const [query, setQuery] = React.useState("");
  const searchRef = React.useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const searchQueryHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
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
          <input
            type="text"
            placeholder="Search for a movie or tv show..."
            className="w-[30rem] bg-gray-900 text-xl text-blue-200 outline-none"
            autoFocus
            ref={searchRef}
            onChange={(e) => setQuery(e.currentTarget.value)}
            onKeyUp={(e) => searchQueryHandler(e)}
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
