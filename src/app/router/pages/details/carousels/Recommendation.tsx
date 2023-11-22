import Carousel from "@/components/Carousel";
import { useApi } from "@/hooks/useApi";
import { memo } from "react";

type Props = {
  mediaType: string;
  id: string;
};

const Recommendation = ({ mediaType, id }: Props) => {
  const { data, isLoading, isError } = useApi(
    `/${mediaType}/${id}/recommendations`,
    [`recommendations-${mediaType}-${id}`]
  );

  return (
    <>
      {data && data?.results?.length > 0 && (
        <Carousel
          title="Recommendations"
          data={data?.results}
          isLoading={isLoading}
          endPoint={mediaType}
          isError={isError}
        />
      )}
    </>
  );
};

export default memo(Recommendation);
