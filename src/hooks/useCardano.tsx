import { createContext, useContext, useEffect, useState } from "react";

export type CardanoApi = Record<string, any>;
type InjectedWindow = typeof window & { cardano: CardanoApi };

type CardanoNetworkId = 0 | 1;

const getCardanoFromWindow = () => {
  return (window as InjectedWindow).cardano;
};

const CardanoContext = createContext<{
  cardano: CardanoApi | undefined;
  refresh: () => void;
  init: () => void | Promise<void>;
}>({
  cardano: undefined,
  refresh: () => console.log("not implemented"),
  init: () => console.log("not implemented"),
});

export const useCardano = () => {
  return useContext(CardanoContext);
};

export const CardanoProvider = ({ children }: { children: JSX.Element }) => {
  const [cardano, setCardano] = useState<CardanoApi | undefined>(
    getCardanoFromWindow()
  );

  const refreshNetwork = () => {
    const api = getCardanoFromWindow();
    console.log({ api });
    api.getNetworkId().then((newNetworkId: CardanoNetworkId) => {
      console.log({ newNetworkId });
      setCardano({
        ...api,
        networkId: newNetworkId,
      });
    });
  };

  const onNetworkChange = (networkId: number) => {
    console.log("network:", networkId === 0 ? "testnet" : "mainnet");
    refreshNetwork();
  };

  const onAccountChange = (_account: string) => {
    refreshNetwork();
  };

  const initApi = async (cardano: CardanoApi | undefined) => {
    if (!cardano) return;

    const isConnected = await cardano.isEnabled();
    const networkId = await cardano.getNetworkId();
    setCardano({ ...cardano, isConnected, networkId });
  };

  useEffect(() => {
    if (!cardano) return;
    return cardano.onNetworkChange(onNetworkChange);
  }, []);

  useEffect(() => {
    if (!cardano) return;
    return cardano.onAccountChange(onAccountChange);
  }, []);

  useEffect(() => {
    if (!cardano?.isConnected) initApi(cardano);
  }, [cardano?.isConnected]);

  return (
    <CardanoContext.Provider
      value={{ cardano, refresh: refreshNetwork, init: () => initApi(cardano) }}
    >
      {children}
    </CardanoContext.Provider>
  );
};
