import { ComponentProps, KeyboardEvent, forwardRef, memo } from "react";

type Props = {
  query: string;
  children?: React.ReactNode;
  searchQueryHandler: (e: KeyboardEvent<HTMLInputElement>) => void;
  setQuery: (query: string) => void;
  autoFocus?: boolean;
  inputClassName?: string;
  noSearchInputClass?: boolean;
} & ComponentProps<"input">;

const SearchInput = forwardRef(
  (
    {
      query,
      children,
      placeholder,
      searchQueryHandler,
      setQuery,
      className,
      autoFocus,
      inputClassName,
      noSearchInputClass,
    }: Props,
    inputRef
  ) => {
    return (
      <div
        className={`${noSearchInputClass ? "" : "searchInput"} ${className}`}
      >
        <input
          type="text"
          placeholder={placeholder}
          ref={inputRef as React.RefObject<HTMLInputElement>}
          className={inputClassName}
          onChange={(e) => setQuery(e.currentTarget.value)}
          onKeyUp={(e) => searchQueryHandler(e)}
          onFocus={(e) => {
            e.currentTarget.value = query;
            e.currentTarget.select();
          }}
          onBlur={(e) => {
            e.currentTarget.value = "";
          }}
          autoFocus={autoFocus}
        />
        {children}
      </div>
    );
  }
);

export default memo(SearchInput);
