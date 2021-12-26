import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CardanoProvider } from "../hooks/useCardano";
import { Assets } from "./Assets/Assets";
import { Balance } from "./Balance/Balance";
import { Delegate } from "./Delegate/Delegate";
import { Wallet } from "./Wallet/Wallet";

function App() {
  return (
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
}

export default App;
