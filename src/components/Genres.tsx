import { useAppSelector } from "@/store/store";
import "@/styles/scss/other/components/genres.scss";
import { memo } from "react";

const Genres = ({ data }: { data: number[] }) => {
  const { genres } = useAppSelector((state) => state.home);
  return (
    <div className="genres">
      {data?.map((g_id) => {
        if (!genres[g_id]?.name) return;
        return (
          <div key={g_id} className="genre">
            {genres[g_id]?.name}
          </div>
        );
      })}
    </div>
  );
};
export default memo(Genres);
