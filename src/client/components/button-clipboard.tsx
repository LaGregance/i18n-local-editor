import { showSnackbar } from '@/client/client-utils';

export type ButtonClipboardProps = {
  text: string;
};

export const ButtonClipboard = (props: ButtonClipboardProps) => {
  const { text } = props;

  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        event.preventDefault();
        navigator.clipboard.writeText(text).then();
        showSnackbar('Copied to clipboard', 'info', 1500);
      }}
      className="cursor-pointer rounded-full p-2 transition-colors hover:bg-gray-200"
    >
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
    </button>
  );
};
