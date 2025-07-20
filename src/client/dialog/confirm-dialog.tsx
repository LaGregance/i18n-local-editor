import { ButtonClose } from '@/client/components/button-close';

export type ConfirmDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => any;
  title: string;
  message: React.ReactNode;
};

export const ConfirmDialog = (props: ConfirmDialogProps) => {
  const { isOpen, onClose, onConfirm, title, message } = props;

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-10 flex w-screen items-center justify-center overflow-y-auto bg-[#88888888]">
      <div className="w-[1000px] max-w-[90%] rounded-lg bg-white px-2 pt-1 pb-2">
        <div className="flex items-center justify-between">
          <h3 className="px-4 pt-4 pb-2 text-lg leading-tight font-bold tracking-[-0.015em] text-[#0d141c]">{title}</h3>
          <ButtonClose onClick={onClose} />
        </div>
        <div className="max-h-[500px] overflow-y-scroll px-4">
          <p>{message}</p>
        </div>

        <div className="flex items-end justify-between px-4 pt-6">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex cursor-pointer justify-center rounded-md border border-black px-10 py-2 text-sm font-semibold text-black shadow-xs hover:bg-gray-100 focus-visible:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 sm:col-start-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="inline-flex cursor-pointer justify-center rounded-md bg-red-600 px-10 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:w-auto"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
