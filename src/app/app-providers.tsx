'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export type AppProvidersProps = {
  children: React.ReactNode;
};

export const queryClient = new QueryClient({});

export const AppProviders = (props: AppProvidersProps) => {
  const { children } = props;

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
