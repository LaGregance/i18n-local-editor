import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export const useSetSearchParams = () => {
  const router = useRouter();
  const currentParams = useSearchParams();

  return useCallback(
    (params: Record<string, string | number | boolean | undefined | null>) => {
      const queryString = new URLSearchParams(currentParams.toString());
      for (const key of Object.keys(params)) {
        const value = params[key];
        if (value === undefined || value === null) {
          queryString.delete(key);
        } else if (typeof value === 'number') {
          queryString.set(key, value.toString(10));
        } else if (typeof value === 'boolean') {
          queryString.set(key, value.toString());
        } else {
          queryString.set(key, value);
        }
      }
      router.push('?' + queryString.toString());
    },
    [router, currentParams]
  );
};
