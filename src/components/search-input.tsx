export type SearchInputProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => any;
};

export const SearchInput = (props: SearchInputProps) => {
  const { onChange, placeholder, value } = props;

  return (
    <label className="flex h-12 w-full min-w-40 flex-col">
      <div className="flex h-full w-full flex-1 items-stretch rounded-lg">
        <div
          className="flex items-center justify-center rounded-l-lg border-r-0 border-none bg-[#e7edf4] pl-4 text-[#49739c]"
          data-icon="MagnifyingGlass"
          data-size="24px"
          data-weight="regular"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
          </svg>
        </div>
        <input
          placeholder={placeholder}
          className="form-input flex h-full w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg rounded-l-none border-l-0 border-none bg-[#e7edf4] px-4 pl-2 text-base leading-normal font-normal text-[#0d141c] placeholder:text-[#49739c] focus:border-none focus:ring-0 focus:outline-0"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </label>
  );
};
