import { memo } from "react";

type Props = {
  children: React.ReactNode;
  searchQuery: string;
};

const GoogleSearchLink = ({ children, searchQuery }: Props) => {
  return (
    <a href={`https://www.google.com/search?q=${searchQuery}`} target="_blank">
      {children}
    </a>
  );
};
export default memo(GoogleSearchLink);
