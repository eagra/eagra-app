import create, { SetState } from 'zustand';
import { combine } from 'zustand/middleware';

type State = {
  baseCurrency: 'usd' | 'eur';
};

const state: State = {
  baseCurrency: 'eur',
};

const setters = (set: SetState<typeof state>) => ({
  toggle: () =>
    set((state) => {
      if (state.baseCurrency === 'usd') {
        return {
          baseCurrency: 'eur',
        };
      }

      return { baseCurrency: 'usd' };
    }),
});

export const useStore = create(combine(state, setters));
