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
import { Tooltip, Text, Box } from "@chakra-ui/react";
import { useRewardAddress } from "../../hooks/useRewardAddress";

export const Balance = () => {
  const { cardano } = useCardano();
  const rewardAddress = useRewardAddress();

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
    <Box css={{ color: "white", width: "100%" }} p="6">
      {isBalanceLoading ? (
        "Loading..."
      ) : (
        <Box marginTop="4">
          <Text fontSize="2xl">
            Available Balance:{" "}
            <span css={{ color: "#99ddff" }}>
              {currencyToSymbol("ada")}
              {balance}{" "}
            </span>
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
          {rewardAddress?.length && rewardAddress.length > 0 && (
            <div css={{ marginTop: 12 }}>
              <Text>Reward Address: {rewardAddress}</Text>
            </div>
          )}
        </Box>
      )}
    </Box>
  );
};
