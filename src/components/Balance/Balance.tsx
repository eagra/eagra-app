import { useEffect, useState } from "react";
import { CardanoApi, useCardano } from "../../hooks/useCardano";
import {
  currencyToSymbol,
  getAssets,
  getBalance,
  getCollateral,
  getLockedBalance,
  lovelaceToAda,
} from "../../lib/assets";

export const Balance = () => {
  const cardano = useCardano();
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
    <div>
      {isBalanceLoading ? (
        "Loading..."
      ) : (
        <span>
          Balance:{" "}
          <span css={{ color: "#99ddff" }}>
            {currencyToSymbol("ada")} {balance}
          </span>
          <div>
            <span css={{ color: "#99ddff", fontSize: 12 }}>
              {"  "}+{currencyToSymbol("ada")} {collateral} collateral
            </span>
            <span css={{ color: "#99ddff", fontSize: 12 }}>
              {"  "}+{currencyToSymbol("ada")} {locked} locked with assets
            </span>
          </div>
        </span>
      )}
    </div>
  );
};
