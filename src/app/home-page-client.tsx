'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/query-keys';
import { Checkbox } from '@/components/checkbox';
import { useEffect, useRef, useState } from 'react';
import { SearchInput } from '@/components/search-input';
import { EditTranslationDialog } from '@/dialog/edit-translation-dialog';
import { useSearchParams } from 'next/navigation';
import { useSetSearchParams } from '@/shared/use-set-search-params';
import { useEditorConfig } from '@/app/app-providers';

export default function HomePageClient() {
  const EDITOR_CONFIG = useEditorConfig();
  const [namespaces, setNamespaces] = useState(EDITOR_CONFIG.namespaces);
  const [search, setSearch] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const setHttpParams = useSetSearchParams();
  const httpParams = useSearchParams();
  const editingKey = httpParams.get('key');

  const debounceTimeout = useRef<NodeJS.Timeout>(null);
  const [debounceSearch, setDebounceSearch] = useState('');
  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setDebounceSearch(search);
      debounceTimeout.current = null;
    }, 800);
  }, [search]);

  const { data } = useQuery(queryKeys.transactions.getAll({ q: debounceSearch, ns: namespaces }));

  return (
    <div
      className="group/design-root relative flex size-full min-h-screen flex-col overflow-x-hidden bg-slate-50"
      style={{
        fontFamily: 'Inter, &quot;Noto Sans&quot;, sans-serif',
      }}
    >
      {addDialogOpen && (
        <EditTranslationDialog
          translationKey={''}
          translations={EDITOR_CONFIG.locales.reduce((acc, locale) => ({ ...acc, [locale]: '' }), {}) as any}
          isOpen={true}
          onClose={() => setAddDialogOpen(false)}
        />
      )}
      {data &&
        Object.keys(data).map((key) =>
          editingKey === key ? (
            <EditTranslationDialog
              key={key}
              translationKey={key}
              translations={data[key]}
              isOpen={true}
              onClose={() => setHttpParams({ key: undefined })}
            />
          ) : null
        )}

      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center px-40 py-5">
          <div className="layout-content-container flex max-w-[960px] flex-1 flex-col">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="tracking-light text-[32px] leading-tight font-bold text-[#0d141c]">Translations</p>
              </div>
            </div>
            <div className="px-4 py-3">
              <SearchInput placeholder="Search key or value" value={search} onChange={setSearch} />
            </div>
            <h3 className="px-4 pt-4 pb-2 text-lg leading-tight font-bold tracking-[-0.015em] text-[#0d141c]">
              Namespaces
            </h3>
            <div className="flex flex-wrap gap-3 p-4">
              {EDITOR_CONFIG.namespaces.map((namespace) => (
                <Checkbox
                  key={namespace}
                  label={namespace}
                  value={namespaces.includes(namespace)}
                  onChange={(value) => {
                    setNamespaces((namespaces) => {
                      if (value) {
                        if (!namespaces.includes(namespace)) {
                          return [...namespaces, namespace];
                        } else {
                          return namespaces;
                        }
                      } else {
                        return namespaces.filter((item) => item !== namespace);
                      }
                    });
                  }}
                />
              ))}
            </div>
            <div className="me-4 flex items-center justify-between">
              <h3 className="px-4 pt-4 pb-2 text-lg leading-tight font-bold tracking-[-0.015em] text-[#0d141c]">
                Translations
              </h3>
              <button
                type="button"
                onClick={() => setAddDialogOpen(true)}
                className="inline-flex justify-center rounded-md bg-indigo-600 px-10 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
              >
                Add
              </button>
            </div>
            <div className="@container flex flex-1 items-stretch px-4 py-3">
              <div className="relative flex-1 overflow-y-hidden rounded-lg border border-[#cedbe8]">
                <div className="absolute top-0 right-0 bottom-0 left-0 overflow-y-auto">
                  <table className="min-w-full border-separate border-spacing-0 overflow-hidden bg-slate-50">
                    <thead className="sticky top-0 bg-white">
                      <tr className="bg-slate-50 font-bold">
                        <th className="border-b border-[#cedbe8] px-4 py-3 text-left text-sm leading-normal text-[#0d141c]">
                          Key
                        </th>
                        {EDITOR_CONFIG.locales.map((locale) => (
                          <th
                            key={locale}
                            className="border-b border-[#cedbe8] px-4 py-3 text-left text-sm leading-normal text-[#0d141c]"
                          >
                            {locale}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        Object.keys(data).map((key) => (
                          <tr
                            key={key}
                            className="cursor-pointer border-t border-t-[#cedbe8] hover:bg-[#f1f2f2]"
                            onClick={() => setHttpParams({ key })}
                          >
                            <td className="px-4 py-2 text-sm leading-normal font-normal text-[#0d141c]">{key}</td>
                            {EDITOR_CONFIG.locales.map((locale) => (
                              <td key={locale} className="px-4 py-2 text-sm leading-normal font-normal text-[#49739c]">
                                {data[key][locale]}
                              </td>
                            ))}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
