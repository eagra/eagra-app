import { ChakraProvider } from "@chakra-ui/react";
import { CardanoProvider } from "../hooks/useCardano";
import { Wallet } from "./Wallet/Wallet";

function App() {
  return (
    <ChakraProvider>
      <CardanoProvider>
        <Wallet />
      </CardanoProvider>
    </ChakraProvider>
  );
}

export default App;
