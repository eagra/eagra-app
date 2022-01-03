import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import logo from "../../assets/cardano-logo.svg";

export const Navbar = () => {
  const [expanded, setExpanded] = useState(false);

  const scrollListener = useCallback(() => {
    const { scrollY } = window;

    if (scrollY >= 16 && !expanded) {
      return setExpanded(true);
    }

    if (scrollY < 16 && expanded) {
      return setExpanded(false);
    }
  }, [expanded]);

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  }, [scrollListener]);

  return (
    <Box
      as="nav"
      p="4"
      css={{
        width: expanded ? "100%" : "96%",
        height: 54,
        marginTop: 16,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
      }}
      bgColor="teal.400"
      borderRadius="md"
      transition="ease-in-out .06s"
    >
      <img className="App-logo" src={logo} height="46" width="46" />

      <Box>
        <Link to="/">
          <Button marginRight="4" as="div">Wallet</Button>
        </Link>

        <Link to="/assets">
          <Button marginRight="4" as="div">Assets</Button>
        </Link>

        <Link to="/staking">
          <Button as="div">Staking</Button>
        </Link>
      </Box>
    </Box>
  );
};
