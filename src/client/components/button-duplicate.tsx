export type ButtonDuplicateProps = {
  onClick: () => any;
};

export const ButtonDuplicate = (props: ButtonDuplicateProps) => {
  const { onClick } = props;

  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        event.preventDefault();
        onClick();
      }}
      className="cursor-pointer rounded-full p-2 transition-colors hover:bg-gray-200"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <rect x="2" y="2" width="13" height="13" rx="2" ry="2" fill="white" />
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" fill="white" />
        <line x1="15.5" y1="13" x2="15.5" y2="17" />
        <line x1="13.5" y1="15" x2="17.5" y2="15" />
      </svg>
    </button>
  );
};
