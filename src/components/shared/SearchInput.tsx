import { ComponentProps, KeyboardEvent, forwardRef, memo } from "react";

type Props = {
  query: string;
  children?: React.ReactNode;
  searchQueryHandler: (e: KeyboardEvent<HTMLInputElement>) => void;
  setQuery: (query: string) => void;
  autoFocus?: boolean;
  inputClassName?: string;
  onlyInput?: boolean;
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
      onlyInput,
    }: Props,
    inputRef
  ) => {
    return (
      <>
        {!onlyInput ? (
          <div className={`searchInput ${className}`}>
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
        ) : (
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
        )}
      </>
    );
  }
);

export default memo(SearchInput);
