import { Box } from "@chakra-ui/layout";
import logo from "../../assets/cardano-logo.svg";

export const Navbar = () => {
  return (
    <Box
      as="nav"
      p="1"
      css={{
        width: "100%",
        margin: 0,
        height: 54,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      bgColor="teal.400"
    >
      <img className="App-logo" src={logo} height="46" width="46" />
    </Box>
  );
};
