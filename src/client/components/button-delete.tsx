export type ButtonDeleteProps = {
  onClick: () => any;
};

export const ButtonDelete = (props: ButtonDeleteProps) => {
  const { onClick } = props;

  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        event.preventDefault();
        onClick();
      }}
      className="cursor-pointer rounded-full p-2 text-red-700 transition-colors hover:bg-gray-200"
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
        <rect x="6" y="7" width="12" height="13" rx="2" ry="2" fill="white" />

        <path d="M5 7h14" />
        <path d="M9 7V4h6v3" />

        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
      </svg>
    </button>
  );
};
