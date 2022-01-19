import { createContext, useContext, useEffect, useState } from "react";
import { Cardano, InjectedApi, InjectedApiType, Serializer } from "../lib";

const CardanoContext = createContext<{
  injected: InjectedApiType | undefined;
  cardano: Cardano | undefined;
  init: (walletName: string) => void;
  // refresh: () => void;
}>({
  injected: undefined,
  cardano: undefined,
  init: (_name) => console.log("not implemented here"),
  // refresh: () => console.log("not implemented"),
});

export const useCardano = () => {
  return useContext(CardanoContext);
};

export const CardanoProvider = ({ children }: { children: JSX.Element }) => {
  const injectedApi = new InjectedApi();
  const serializer = new Serializer();
  const [cardano, setCardano] = useState<Cardano | undefined>();

  useEffect(() => {
    injectedApi.enabled().then(async (enabled) => {
      if (!enabled) return;
      const fullApi = await enabled?.enable();
      if (!fullApi) return;

      const wallet = {
        ...enabled,
        fullApi,
      };

      setCardano(new Cardano(wallet, serializer));
    });
  }, []);

  const init = (walletKey: string) => {
    injectedApi.init(walletKey).then((fullApi) => {
      const wallet = {
        ...injectedApi.injected[walletKey],
        fullApi,
      };

      setCardano(new Cardano(wallet, serializer));
    });
  };

  // const refreshNetwork = () => {
  //   const api = getCardanoFromWindow();
  //   console.log({ api });
  //   api.getNetworkId().then((newNetworkId: CardanoNetworkId) => {
  //     console.log({ newNetworkId });
  //     setCardano({
  //       ...api,
  //       networkId: newNetworkId,
  //     });
  //   });
  // };

  // const onNetworkChange = (networkId: number) => {
  //   console.log("network:", networkId === 0 ? "testnet" : "mainnet");
  //   refreshNetwork();
  // };

  // const onAccountChange = (_account: string) => {
  //   refreshNetwork();
  // };

  // const initApi = async (cardano: CardanoApi | undefined) => {
  //   if (!cardano) return;

  //   const isConnected = await cardano.isEnabled();
  //   const networkId = await cardano.getNetworkId();
  //   setCardano({ ...cardano, isConnected, networkId });
  // };

  // useEffect(() => {
  //   if (!cardano) return;
  //   return cardano.onNetworkChange(onNetworkChange);
  // }, []);

  // useEffect(() => {
  //   if (!cardano) return;
  //   return cardano.onAccountChange(onAccountChange);
  // }, []);

  // useEffect(() => {
  //   if (!cardano?.isConnected) initApi(cardano);
  // }, [cardano?.isConnected]);

  return (
    <CardanoContext.Provider
      value={{
        injected: injectedApi.injected,
        init,
        cardano,
      }}
    >
      {children}
    </CardanoContext.Provider>
  );
};
