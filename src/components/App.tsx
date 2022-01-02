import { ChakraProvider } from "@chakra-ui/react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { CardanoProvider } from "../hooks/useCardano";
import { Assets } from "./Assets/Assets";
import { Balance } from "./Balance/Balance";
import { Delegate } from "./Delegate/Delegate";
import { Wallet } from "./Wallet/Wallet";

const App = () => (
  <ChakraProvider>
    <CardanoProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Wallet />}>
            <Route index element={<Balance />} />
            <Route path="assets" element={<Assets />} />
            <Route path="delegate" element={<Delegate />} />
          </Route>
        </Routes>
      </Router>
    </CardanoProvider>
  </ChakraProvider>
);

export default App;
