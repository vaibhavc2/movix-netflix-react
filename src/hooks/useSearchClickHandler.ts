import { useNavigate } from "react-router-dom";

export const useSearchClickHandler = (
  query: string,
  ref?: React.RefObject<HTMLInputElement>
) => {
  const navigate = useNavigate();

  return () => {
    if (query.length > 0) navigate(`/search/${query}`);
    if (ref && ref.current) {
      ref.current.value = "";
      ref.current?.blur();
    }
  };
};
