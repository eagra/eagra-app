import logo from "../assets/cardano-logo.svg";
import "./App.css";
import { Balance } from "./Balance/Balance";
import { WalletConnection } from "./WalletConnection/WalletConnection";

function App() {
  return (
    <div className="App App-header">
      <div css={{ fontSize: 32, marginBottom: 64 }}>Eagra Wallet</div>
      <img
        className="App-logo"
        width="64"
        height="64"
        src={logo}
        css={{ marginBottom: 32 }}
      />
      <WalletConnection />
      <Balance />
    </div>
  );
}

export default App;
