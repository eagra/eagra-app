import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

const pageLoading = atom(false);

export const useLoading = () => {
  return useAtom(pageLoading);
};

export const usePageLoading = (loadingState: boolean) => {
  const [, setLoading] = useLoading();

  useEffect(() => {
    setLoading(loadingState);
  }, [loadingState, setLoading]);
};
