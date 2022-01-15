import { useEffect, useState } from "react";
import { useCardano } from "../../hooks/useCardano";
import { InfoIcon } from "@chakra-ui/icons";
import {
  Tooltip,
  Text,
  Box,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import { useRewardAddress } from "../../hooks/useRewardAddress";
import { useScreenSize } from "../../hooks/useScreenSize";
import { Cardano, currencySymbol, lovelaceToAda } from "../../lib";
import BigNumber from "bignumber.js";

export const Balance = () => {
  const { cardano } = useCardano();
  const rewardAddress = useRewardAddress();
  const textHighlightColor = useColorModeValue("teal.500", "teal.300");
  const backdropColor = useColorModeValue("blackAlpha.100", "whiteAlpha.50");
  const { isMobile, isMedium } = useScreenSize();

  const [balance, setBalance] = useState(new BigNumber(0));
  const [collateral, setCollateral] = useState(new BigNumber(0));
  const [locked, setLocked] = useState(new BigNumber(0));
  const [isBalanceLoading, setIsBalanceLoading] = useState(false);

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

  if (!cardano) return null;

  {
    /* TODO: Refactor this 💩 */
  }
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
          height="50%"
        >
          <>
            <Box display="flex" justifyContent="flex-start" alignItems="center">
              <Text fontSize="2xl" marginRight="2">Balance: </Text>
              <Text fontSize="2xl" as="b" color={textHighlightColor}>
                {currencySymbol("ada")}
                {balance.toFixed(2)}{" "}
              </Text>
            </Box>
            <Text fontSize="md">
              Available balance: {currencySymbol("ada")}
              {balance.minus(collateral).minus(locked).toFixed(2)}{" "}
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
          </>

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
