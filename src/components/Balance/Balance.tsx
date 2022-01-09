import { useEffect, useState } from "react";
import { CardanoApi, useCardano } from "../../hooks/useCardano";
import { InfoIcon } from "@chakra-ui/icons";
import {
  currencyToSymbol,
  getBalance,
  getCollateral,
  getLockedBalance,
  lovelaceToAda,
} from "../../lib/assets";
import {
  Tooltip,
  Text,
  Box,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import { useRewardAddress } from "../../hooks/useRewardAddress";

export const Balance = () => {
  const { cardano } = useCardano();
  const rewardAddress = useRewardAddress();
  const textHighlightColor = useColorModeValue("teal.500", "teal.300");
  const backdropColor = useColorModeValue("blackAlpha.100", "whiteAlpha.50");

  const [balance, setBalance] = useState("0");
  const [collateral, setCollateral] = useState("0");
  const [locked, setLocked] = useState("0");
  const [isBalanceLoading, setIsBalanceLoading] = useState(false);

  const getAdaBalance = async (cardano: CardanoApi) => {
    const lovelaceBalance = await getBalance(cardano);
    return lovelaceToAda(lovelaceBalance);
  };

  const getAdaCollateral = async (cardano: CardanoApi) => {
    const collateral = await getCollateral(cardano);
    return lovelaceToAda(collateral);
  };

  const getAdaLockedBalance = async (cardano: CardanoApi) => {
    const locked = await getLockedBalance(cardano);
    return lovelaceToAda(locked);
  };

  const activeBalance = async (cardano: CardanoApi) => {
    const [balance, collateral, locked] = await Promise.all([
      getAdaBalance(cardano),
      getAdaCollateral(cardano),
      getAdaLockedBalance(cardano),
    ]);

    const activeBalance = balance.subtract(collateral).subtract(locked);

    setBalance(activeBalance.trunc(6).toString());
    setCollateral(collateral.trunc(6).toString());
    setLocked(locked.trunc(6).toString());
  };

  useEffect(() => {
    if (!cardano || !cardano.isConnected) return;
    setIsBalanceLoading(true);
    activeBalance(cardano).finally(() => setIsBalanceLoading(false));
  }, [cardano]);

  if (!cardano || !cardano.isConnected) return null;

  return (
    <Box w="50%" flex="1">
      <Heading>Dashboard</Heading>
      {isBalanceLoading ? (
        "Loading..."
      ) : (
        <Box
          backdropFilter="blur(6px)"
          bgColor={backdropColor}
          p="8"
          borderRadius="lg"
          marginTop="8"
          height="50%"
        >
          <Text fontSize="2xl">
            Available Balance:{" "}
            <Text as="b" color={textHighlightColor}>
              {currencyToSymbol("ada")}
              {balance}{" "}
            </Text>
            <Tooltip
              label={`+${currencyToSymbol(
                "ada"
              )}${collateral} collateral and ${currencyToSymbol(
                "ada"
              )}${locked} locked with assets`}
            >
              <InfoIcon />
            </Tooltip>
          </Text>

          {rewardAddress?.length && rewardAddress.length > 0 && (
            <div css={{ marginTop: 12 }}>
              <Text>
                Reward Address: <Text fontStyle="italic">{rewardAddress}</Text>
              </Text>
            </div>
          )}
        </Box>
      )}
    </Box>
  );
};
