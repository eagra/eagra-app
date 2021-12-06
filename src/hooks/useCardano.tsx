import { createContext, useContext, useEffect, useState } from "react";

export type CardanoApi = Record<string, any>;
type InjectedWindow = typeof window & { cardano: CardanoApi };

type CardanoNetworkId = 0 | 1;

const getCardanoFromWindow = () => {
  return (window as InjectedWindow).cardano;
};

const CardanoContext = createContext<CardanoApi | undefined>({});

export const useCardano = () => {
  return useContext(CardanoContext);
};

export const CardanoProvider = ({ children }: { children: JSX.Element }) => {
  const [cardano, setCardano] = useState<CardanoApi | undefined>(
    getCardanoFromWindow()
  );

  const onNetworkChange = (networkId: number) => {
    console.log("network:", networkId === 0 ? "testnet" : "mainnet");

    const api = getCardanoFromWindow();
    api.getNetworkId().then((newNetworkId: CardanoNetworkId) => {
      setCardano({
        ...api,
        networkId: newNetworkId,
      });
    });
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
    if (!cardano?.isConnected) initApi(cardano);
  }, [cardano?.isConnected]);

  return (
    <CardanoContext.Provider value={cardano}>
      {children}
    </CardanoContext.Provider>
  );
};
