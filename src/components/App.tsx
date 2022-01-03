import { ChakraProvider } from "@chakra-ui/react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { CardanoProvider } from "../hooks/useCardano";
import { Assets } from "./Assets/Assets";
import { Balance } from "./Balance/Balance";
import { Staking } from "./Staking/Staking";
import { Wallet } from "./Wallet/Wallet";

const App = () => (
  <ChakraProvider>
    <CardanoProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Wallet />}>
            <Route index element={<Balance />} />
            <Route path="assets" element={<Assets />} />
            <Route path="staking" element={<Staking />} />
          </Route>
        </Routes>
      </Router>
    </CardanoProvider>
  </ChakraProvider>
);

export default App;
