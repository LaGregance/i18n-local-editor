export type ButtonCloseProps = {
  onClick: () => any;
};

export const ButtonClose = (props: ButtonCloseProps) => {
  const { onClick } = props;

  return (
    <button
      type="button"
      className="mr-2 cursor-pointer rounded-full p-2 transition-colors hover:bg-gray-200"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
};
