import { InputGroup } from '@/client/components/input-group';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/client/query-keys';
import { useEditorConfig } from '@/app/app-providers';
import { createURLQuery, manageAPIResponse } from '@/client/client-utils';
import { ButtonClose } from '@/client/components/button-close';

export type EditTranslationDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  translationKey: string;
  translations: any;
  mode: 'add' | 'edit';

  namespaces?: string[];
  existingKeys?: string[];
};

export const EditTranslationDialog = (props: EditTranslationDialogProps) => {
  const editorConfig = useEditorConfig();
  const { mode, isOpen, onClose, namespaces, existingKeys } = props;

  const [key, setKey] = useState(props.translationKey);
  const [translations, setTranslations] = useState(props.translations);

  const queryClient = useQueryClient();

  const handleValidate = useCallback(async () => {
    const res = await fetch(`/api/translations`, {
      method: mode === 'add' ? 'POST' : 'PATCH',
      body: JSON.stringify({ key, translations, oldKey: mode === 'add' ? undefined : props.translationKey }),
    });

    if (await manageAPIResponse(res)) {
      onClose();
      await queryClient.invalidateQueries({ queryKey: queryKeys.transactions.getAll._def });
    }
  }, [onClose, queryClient, key, translations, props.translationKey, mode]);

  const onDelete = useCallback(async () => {
    const res = await fetch(`/api/translations${createURLQuery({ key: props.translationKey })}`, {
      method: 'DELETE',
    });

    if (await manageAPIResponse(res)) {
      onClose();
      await queryClient.invalidateQueries({ queryKey: queryKeys.transactions.getAll._def });
    }
  }, [props.translationKey, onClose, queryClient]);

  const keysAutocomplete = useMemo(() => {
    const result: string[] = [];
    if (existingKeys) {
      result.push(...existingKeys);
    }
    if (namespaces) {
      for (const namespace of namespaces) {
        result.push(namespace + ':');
      }
    }
    return result;
  }, [namespaces, existingKeys]);

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
      <div className="w-[1000px] max-w-[90%] rounded-lg bg-white px-2 pt-1 pb-2">
        <div className="flex items-center justify-between">
          <h3 className="px-4 pt-4 pb-2 text-lg leading-tight font-bold tracking-[-0.015em] text-[#0d141c]">
            {mode === 'add' ? 'Add' : 'Edit'} a translation
          </h3>
          <ButtonClose onClick={onClose} />
        </div>
        <div className="max-h-[500px] overflow-y-scroll">
          <InputGroup
            title="Key"
            value={key}
            onChange={setKey}
            autocompleteId="keys-autocomplete"
            autocomplete={keysAutocomplete}
          />
          {editorConfig.locales.map((locale) => (
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
          {mode === 'add' ? (
            <div />
          ) : (
            <button
              type="button"
              onClick={onDelete}
              className="inline-flex justify-center rounded-md bg-red-600 px-10 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:w-auto"
            >
              Delete
            </button>
          )}
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
