import { useEffect, useRef, useState } from "react";
import logo from "../assets/cardano-logo.svg";
import { deserialize } from "../utils/serializer";
import { valueToAssets } from "../utils/assets";
import "./App.css";

type InjectedApi = typeof window & { cardano: Record<string, any> };

const useCardano = () => {
  const cardanoRef = useRef((window as InjectedApi).cardano);
  return cardanoRef.current;
};

function App() {
  const cardano = useCardano();

  const [isEnabled, setIsEnabled] = useState(false);

  const checkInitialConnection = async () => {
    const isEnabled = await cardano?.isEnabled();
    setIsEnabled(isEnabled);
  };

  const connectWallet = async () => {
    if (!cardano) return;
    await cardano.enable();
  };

  const getAssets = async () => {
    if (!cardano) return;

    const rawBalance = await cardano.getBalance();

    const balance = deserialize(rawBalance);
    const assets = await valueToAssets(balance);

    return assets;
  };

  useEffect(() => {
    checkInitialConnection();
  }, []);

  useEffect(() => {
    if (!isEnabled) return;
    getAssets().then(console.log);
  }, [isEnabled]);

  return (
    <div className="App App-header">
      <img width="64" height="64" src={logo} css={{ paddingBottom: 32 }} />
      <div>Eagra Wallet</div>
      {isEnabled ? (
        <div>Wallet Connected ✨</div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}

export default App;
