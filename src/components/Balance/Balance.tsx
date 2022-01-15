import { useEffect, useMemo, useState } from "react";
import { useCardano } from "../../hooks/useCardano";
import { InfoIcon } from "@chakra-ui/icons";
import {
  Tooltip,
  Text,
  Box,
  useColorModeValue,
  Heading,
  Switch,
} from "@chakra-ui/react";
import { useRewardAddress } from "../../hooks/useRewardAddress";
import { useScreenSize } from "../../hooks/useScreenSize";
import { Cardano, currencySymbol, lovelaceToAda } from "../../lib";
import BigNumber from "bignumber.js";
import { usePrice } from "../../hooks/usePriceData";
import { useAddresses } from "../../hooks/useAddresses";

export const Balance = () => {
  const { cardano } = useCardano();
  const rewardAddress = useRewardAddress();
  const [address] = useAddresses();

  const [baseCurrency, setBaseCurrency] = useState<"eur" | "usd">("eur");
  const { price } = usePrice(baseCurrency);

  const [balance, setBalance] = useState(new BigNumber(0));
  const [collateral, setCollateral] = useState(new BigNumber(0));
  const [locked, setLocked] = useState(new BigNumber(0));
  const [isBalanceLoading, setIsBalanceLoading] = useState(false);

  const textHighlightColor = useColorModeValue("teal.500", "teal.300");
  const backdropColor = useColorModeValue("blackAlpha.100", "whiteAlpha.50");
  const { isMobile, isMedium } = useScreenSize();

  const getBalances = async (cardano: Cardano) => {
    const balances = await Promise.all([
      cardano.getTotalBalance(),
      cardano.getCollateral(),
      cardano.getLockedBalance(),
    ]);

    const [total, collateral, locked] = balances.map((bal) =>
      lovelaceToAda(bal)
    );

    setBalance(total);
    setCollateral(collateral);
    setLocked(locked);
  };

  useEffect(() => {
    if (!cardano) return;
    setIsBalanceLoading(true);
    getBalances(cardano).finally(() => setIsBalanceLoading(false));
  }, [cardano]);

  const availableBalance = useMemo(() => {
    return balance.minus(collateral).minus(locked);
  }, [balance, collateral, locked]);

  if (!cardano) return null;

  /* TODO: Refactor this 💩 */
  return (
    <Box w={isMobile || isMedium ? "100%" : "50%"} flex="1">
      <Heading>Dashboard</Heading>
      {isBalanceLoading ? (
        <Text>Loading...</Text>
      ) : (
        <Box
          backdropFilter="blur(6px)"
          bgColor={backdropColor}
          p="8"
          borderRadius="lg"
          marginTop="8"
          minHeight="25%"
        >
          <Box
            position="absolute"
            top="4"
            right="4"
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
            width="80px"
          >
            <Text>{currencySymbol("eur")}</Text>
            <Switch
              checked={baseCurrency === "eur"}
              onChange={() => {
                if (baseCurrency === "usd") {
                  return setBaseCurrency("eur");
                }

                setBaseCurrency("usd");
              }}
            />
            <Text>{currencySymbol("usd")}</Text>
          </Box>

          <Box display="flex" justifyContent="flex-start" alignItems="center">
            <Text fontSize="2xl" marginRight="2">
              Balance:{" "}
            </Text>
            <Text fontSize="2xl" as="b" color={textHighlightColor}>
              {currencySymbol("ada")}
              {balance.toFixed(2)}{" "}
            </Text>
          </Box>
          {price && (
            <Text fontSize="sm" paddingLeft="2">
              {currencySymbol(baseCurrency)}
              {(balance.toNumber() * price).toFixed(2)}{" "}
            </Text>
          )}
          <Text fontSize="md" marginTop="4">
            Available balance:{" "}
            <Text as="b" color={textHighlightColor}>
              {currencySymbol("ada")}
              {availableBalance.toFixed(2)}{" "}
            </Text>
            <Tooltip
              label={`+${currencySymbol("ada")}${collateral.toFixed(
                2
              )} collateral and ${currencySymbol("ada")}${locked.toFixed(
                2
              )} locked with assets`}
            >
              <InfoIcon />
            </Tooltip>
          </Text>
          {price && (
            <Text fontSize="sm" paddingLeft="2">
              {currencySymbol(baseCurrency)}
              {(availableBalance.toNumber() * price).toFixed(2)}{" "}
            </Text>
          )}
        </Box>
      )}

      <Box
        backdropFilter="blur(6px)"
        bgColor={backdropColor}
        p="8"
        borderRadius="lg"
        marginTop="8"
        minHeight="25%"
      >
        {address && (
          <Box width="100%">
            <Text>
              Address:{" "}
              <Text
                width="100%"
                overflowX="auto"
                as="span"
                display="inline-block"
                fontStyle="italic"
                p="2"
              >
                {address}
              </Text>
            </Text>
          </Box>
        )}

        {rewardAddress && (
          <Box marginTop="4" width="100%" overflowX="auto">
            <Text>
              Reward Address:{" "}
              <Text
                width="100%"
                as="span"
                display="inline-block"
                fontStyle="italic"
                p="2"
              >
                {rewardAddress}
              </Text>
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};
