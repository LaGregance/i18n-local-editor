import { InputGroup } from '@/components/input-group';
import { useCallback, useEffect, useState } from 'react';
import { EDITOR_CONFIG } from '@/i18n/config';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/shared/query-keys';
import { createURLQuery } from '@/shared/utils';

export type EditTranslationDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  translationKey: string;
  translations: any;
};

export const EditTranslationDialog = (props: EditTranslationDialogProps) => {
  const { isOpen, onClose } = props;

  const [key, setKey] = useState(props.translationKey);
  const [translations, setTranslations] = useState(props.translations);

  const queryClient = useQueryClient();

  const handleValidate = useCallback(async () => {
    await fetch(`/api/translations`, {
      method: 'POST',
      body: JSON.stringify({ key, translations, oldKey: props.translationKey }),
    });

    onClose();
    await queryClient.invalidateQueries({ queryKey: queryKeys.transactions.getAll._def });
  }, [onClose, queryClient, key, translations, props.translationKey]);

  const onDelete = useCallback(async () => {
    await fetch(`/api/translations${createURLQuery({ key: props.translationKey })}`, {
      method: 'DELETE',
    });

    onClose();
    await queryClient.invalidateQueries({ queryKey: queryKeys.transactions.getAll._def });
  }, [props.translationKey, onClose, queryClient]);

  useEffect(() => {
    // Manage Ctrl+S
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const isSaveShortcut = (isMac && e.metaKey) || (!isMac && e.ctrlKey);

      if (isSaveShortcut && e.key === 's') {
        e.preventDefault(); // prevent browser's Save Page dialog
        handleValidate();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleValidate]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-10 flex w-screen items-center justify-center overflow-y-auto bg-[#88888888]">
      <div className="min-w-[90%] rounded-lg bg-white px-2 pt-1 pb-2">
        <div className="flex items-center justify-between">
          <h3 className="px-4 pt-4 pb-2 text-lg leading-tight font-bold tracking-[-0.015em] text-[#0d141c]">
            Edit a translation
          </h3>
          <button
            type="button"
            className="mr-2 cursor-pointer rounded-full p-2 transition-colors hover:bg-gray-200"
            onClick={onClose}
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
        </div>
        <div className="max-h-[500px] overflow-y-scroll">
          <InputGroup title="Key" value={key} onChange={setKey} />
          {EDITOR_CONFIG.locales.map((locale) => (
            <InputGroup
              key={locale}
              title={locale}
              value={translations[locale] ?? ''}
              onChange={(value) => {
                setTranslations((x: any) => ({
                  ...x,
                  [locale]: value,
                }));
              }}
              multiline={true}
            />
          ))}
        </div>

        <div className="flex items-end justify-between px-4 pt-6">
          <button
            type="button"
            onClick={onDelete}
            className="inline-flex justify-center rounded-md bg-red-600 px-10 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={handleValidate}
            className="inline-flex justify-center rounded-md bg-indigo-600 px-10 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
