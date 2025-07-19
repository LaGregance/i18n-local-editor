'use client';

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { EditorConfig } from '@/i18n/config';
import { createContext, useContext } from 'react';
import { queryKeys } from '@/shared/query-keys';

export type AppProvidersProps = {
  children: React.ReactNode;
};

export const queryClient = new QueryClient({});

const EditorConfigContext = createContext<EditorConfig>(undefined as any);
export const useEditorConfig = () => useContext(EditorConfigContext);

const ConfigProvider = (props: AppProvidersProps) => {
  const { children } = props;

  const { data } = useQuery(queryKeys.config.get);
  if (!data) {
    return <p>Loading...</p>;
  }

  return <EditorConfigContext value={data}>{children}</EditorConfigContext>;
};

export const AppProviders = (props: AppProvidersProps) => {
  const { children } = props;

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider>{children}</ConfigProvider>
    </QueryClientProvider>
  );
};
