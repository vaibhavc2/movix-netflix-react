import Carousel from "@/components/Carousel";
import { useApi } from "@/hooks/useApi";
import { memo } from "react";

type Props = {
  mediaType: string;
  id: string;
};

const Similar = ({ mediaType, id }: Props) => {
  const { data, isLoading, isError } = useApi(`/${mediaType}/${id}/similar`, [
    `similar-${mediaType}-${id}`,
  ]);

  const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

  return (
    <>
      {data && data?.results?.length > 0 && (
        <Carousel
          title={title}
          data={data?.results}
          isLoading={isLoading}
          isError={isError}
          endPoint={mediaType}
        />
      )}
    </>
  );
};

export default memo(Similar);
