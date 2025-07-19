'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { EditorConfig } from '@/i18n/config';
import { createContext, useContext } from 'react';

export type AppProvidersProps = {
  children: React.ReactNode;
  EDITOR_CONFIG: EditorConfig;
};

export const queryClient = new QueryClient({});

const EditorConfigContext = createContext<EditorConfig>(undefined as any);
export const useEditorConfig = () => useContext(EditorConfigContext);

export const AppProviders = (props: AppProvidersProps) => {
  const { children, EDITOR_CONFIG } = props;

  return (
    <EditorConfigContext value={EDITOR_CONFIG}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </EditorConfigContext>
  );
};
