import { useRef } from "react";

export type CardanoInjectedApi = Record<string, any>;

type InjectedWindow = typeof window & { cardano: CardanoInjectedApi };

export const useCardano = (): CardanoInjectedApi => {
  const cardanoRef = useRef((window as InjectedWindow).cardano);
  return cardanoRef.current;
};
