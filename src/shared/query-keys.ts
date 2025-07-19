import { createQueryKeyStore } from '@lukemorales/query-key-factory';
import { createURLQuery } from '@/shared/utils';

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
