import { createQueryKeyStore } from '@lukemorales/query-key-factory';

const createURLQuery = (params: any) => {
  let query = new URLSearchParams(params).toString();
  if (query.length > 0) {
    query = '?' + query;
  }
  return query;
};

export const queryKeys = createQueryKeyStore({
  transactions: {
    getAll: (params?: { q?: string; locales?: string[]; ns?: string[] }) => ({
      queryKey: [params],
      queryFn: async () => {
        return fetch('/api/translations' + createURLQuery(params)).then((res) => res.json());
      },
    }),
  },
});
