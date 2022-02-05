import { useEffect, useMemo, useState } from 'react';
import { useCardano } from '../../hooks/useCardano';
import { InfoIcon } from '@chakra-ui/icons';
import { Tooltip, Text, Box, useColorModeValue, Heading, Switch } from '@chakra-ui/react';
import { useRewardAddress } from '../../hooks/useRewardAddress';
import { useScreenSize } from '../../hooks/useScreenSize';
import { Cardano, currencySymbol, lovelaceToAda } from '../../lib';
import BigNumber from 'bignumber.js';
import { usePrice } from '../../hooks/usePriceData';
import { useAddresses } from '../../hooks/useAddresses';
import { Transactions } from './Transactions/Transactions';
import { useStore } from '../../hooks/store/useStore';

export const Balance = () => {
  const { cardano } = useCardano();
  const { unused } = useAddresses();
  const rewardAddress = useRewardAddress();

  const [baseCurrency, toggle] = useStore((state) => [state.baseCurrency, state.toggle]);

  const { price } = usePrice();

  const [balance, setBalance] = useState(new BigNumber(0));
  const [collateral, setCollateral] = useState(new BigNumber(0));
  const [locked, setLocked] = useState(new BigNumber(0));
  const [isBalanceLoading, setIsBalanceLoading] = useState(false);

  const textHighlightColor = useColorModeValue('teal.500', 'teal.300');
  const backdropColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.50');
  const { isMobile, isMedium } = useScreenSize();

  const getBalances = async (cardano: Cardano) => {
    const balances = await Promise.all([
      cardano.getTotalBalance(),
      cardano.getCollateral(),
      cardano.getLockedBalance(),
    ]);

    const [total, collateral, locked] = balances.map((bal) => lovelaceToAda(bal));

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
    <Box w="100%">
      {isBalanceLoading ? (
        <Heading>Loading...</Heading>
      ) : (
        <Box
          w={isMobile || isMedium ? '100%' : '50%'}
          backdropFilter="blur(6px)"
          bgColor={backdropColor}
          p="8"
          borderRadius="lg"
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
            <Text>{currencySymbol('eur')}</Text>
            <Switch checked={baseCurrency === 'eur'} onChange={toggle} />
            <Text>{currencySymbol('usd')}</Text>
          </Box>

          <Text fontSize="lg" fontStyle="italic">
            Balance
          </Text>
          <Box display="flex" alignItems="flex-end" p="0">
            <Text fontSize="4xl" fontWeight="bold" color={textHighlightColor} lineHeight="1">
              {currencySymbol('ada')}
              {balance.toFixed(2)}{' '}
            </Text>
            {price && (
              <Text fontSize="lg" paddingLeft="2">
                {currencySymbol(baseCurrency)}
                {(balance.toNumber() * price).toFixed(2)}{' '}
              </Text>
            )}
          </Box>

          <Text fontSize="sm" marginTop="4" fontStyle="italic">
            Available balance
          </Text>
          <Box display="flex" alignItems="center" p="0">
            <Text as="b" fontSize="lg" color={textHighlightColor}>
              {currencySymbol('ada')}
              {availableBalance.toFixed(2)}{' '}
            </Text>
            {price && (
              <Text fontSize="sm" paddingLeft="2" marginRight="2">
                {currencySymbol(baseCurrency)}
                {(availableBalance.toNumber() * price).toFixed(2)}{' '}
              </Text>
            )}
            <Tooltip
              label={`+${currencySymbol('ada')}${collateral.toFixed(
                2,
              )} collateral and ${currencySymbol('ada')}${locked.toFixed(2)} locked with assets`}
            >
              <InfoIcon />
            </Tooltip>
          </Box>
        </Box>
      )}

      <Box
        backdropFilter="blur(6px)"
        bgColor={backdropColor}
        p="8"
        borderRadius="lg"
        marginTop="4"
        minHeight="25%"
        w={isMobile || isMedium ? '100%' : '50%'}
      >
        {unused?.[0] && (
          <Box width="100%">
            <Text>
              Address:{' '}
              <Text
                width="100%"
                overflowX="auto"
                as="span"
                display="inline-block"
                fontStyle="italic"
                p="2"
              >
                {unused?.[0]}
              </Text>
            </Text>
          </Box>
        )}

        {rewardAddress && (
          <Box marginTop="4" width="100%" overflowX="auto">
            <Text>
              Reward Address:{' '}
              <Text width="100%" as="span" display="inline-block" fontStyle="italic" p="2">
                {rewardAddress}
              </Text>
            </Text>
          </Box>
        )}
      </Box>
      <Transactions />
    </Box>
  );
};
