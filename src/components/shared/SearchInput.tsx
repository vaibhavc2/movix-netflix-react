import { ComponentProps, KeyboardEvent } from "react";

type Props = {
  children?: React.ReactNode;
  searchQueryHandler: (e: KeyboardEvent<HTMLInputElement>) => void;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  inputRef?: React.RefObject<HTMLInputElement> | undefined;
} & ComponentProps<"input">;

const SearchInput = ({
  children,
  placeholder,
  searchQueryHandler,
  setQuery,
  inputRef,
  className,
}: Props) => {
  return (
    <div className={"searchInput " + className}>
      <input
        type="text"
        placeholder={placeholder}
        ref={inputRef}
        onChange={(e) => setQuery(e.currentTarget.value)}
        onKeyUp={(e) => searchQueryHandler(e)}
      />
      {children}
    </div>
  );
};
export default SearchInput;
