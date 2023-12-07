import PosterFallback from "@/assets/no-poster.png";
import { useAppSelector } from "@/store/store";
import { memo } from "react";
import LazyImg from "../LazyImg";

type Props = {
  searchData: any;
  searchResultHandler: (item: any) => void;
};

const SearchResults = ({ searchData, searchResultHandler }: Props) => {
  const { url } = useAppSelector((state) => state.home);

  return (
    <>
      {searchData?.length > 0 &&
        searchData?.map((item: any, index: number) => {
          if (index > 4) return null;

          return (
            <div
              key={String(index) + "-" + String(item.id)}
              className="popup-item w-full cursor-pointer"
              onClick={() => searchResultHandler(item)}
            >
              <div
                className={`flex w-full items-center border-gray-600 py-3 ${
                  searchData.length > 4 && index > 0 ? "border-t-2" : ""
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
                    {item.media_type === "movie" ? "(Movie)" : "(TV Show)"}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default memo(SearchResults);
