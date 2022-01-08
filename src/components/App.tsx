import { ChakraProvider } from "@chakra-ui/react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { CardanoProvider } from "../hooks/useCardano";
import { Assets } from "./Assets/Assets";
import { Balance } from "./Balance/Balance";
import { Staking } from "./Staking/Staking";
import { Dashboard } from "./Dashboard/Dashboard";
import theme from "../utils/theme";

const App = () => (
  <ChakraProvider theme={theme}>
    <CardanoProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />}>
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
