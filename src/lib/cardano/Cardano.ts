import {
  TransactionUnspentOutput,
  min_ada_required,
  BigNum,
} from '@emurgo/cardano-serialization-lib-browser';
import BigNumber from 'bignumber.js';
import { Serializer } from '..';
import { Cbor, FullApi, WalletApi } from '../injected';
import { valueToLovelace } from '../utils';

export const MIN_UTXO = 1_000_000;
export type CardanoApi = WalletApi & { fullApi: FullApi };

export class Cardano {
  wallet: CardanoApi;
  serializer: Serializer;

  public constructor(wallet: CardanoApi, serializer: Serializer) {
    this.wallet = wallet;
    this.serializer = serializer;
  }

  getTotalBalance = async () => {
    const rawBalance = await this.wallet.fullApi.getBalance();
    const balance = this.serializer.hexToValue(rawBalance);
    return valueToLovelace(balance);
  };

  getAddresses = async () => {
    const rawAddresses = await this.wallet.fullApi.getUnusedAddresses();

    return rawAddresses.map((rawAddress: string): string =>
      this.serializer.hexToAddress(rawAddress).to_bech32()
    );
  };

  getUsedAddresses = async () => {
    const rawAddresses = await this.wallet.fullApi.getUsedAddresses({
      limit: 10,
      page: 1,
    });

    return rawAddresses.map((rawAddress: string): string =>
      this.serializer.hexToAddress(rawAddress).to_bech32()
    );
  };

  getRewardAddress = async (): Promise<string> => {
    const [rewardAddressRaw] = await this.wallet.fullApi.getRewardAddresses();
    if (!rewardAddressRaw) throw Error('could not get reward address');

    const rewardAddress = this.serializer
      .hexToAddress(rewardAddressRaw)
      .to_bech32();

    return rewardAddress;
  };

  getAssets = async () => {
    const rawBalance = await this.wallet.fullApi.getBalance();
    const balance = this.serializer.hexToValue(rawBalance);
    return await this.serializer.valueToAssets(balance);
  };

  getCollateral = async () => {
    if (
      !this.wallet.fullApi.experimental ||
      !this.wallet.fullApi.experimental.getCollateral ||
      typeof this.wallet.fullApi.experimental.getCollateral !== 'function'
    ) {
      return new BigNumber(0);
    }

    const [rawCollateral]: Cbor<TransactionUnspentOutput> =
      await this.wallet.fullApi.experimental.getCollateral();
    if (!rawCollateral) return new BigNumber(0);

    const collateral = this.serializer.hexToBytes(rawCollateral);

    const tx = TransactionUnspentOutput.from_bytes(collateral);
    return valueToLovelace(tx.output().amount());
  };

  getLockedBalance = async () => {
    const rawBalance = await this.wallet.fullApi.getBalance();
    const balance = this.serializer.hexToValue(rawBalance);

    const lockedAda = min_ada_required(
      balance,
      BigNum.from_str(MIN_UTXO.toString())
    ).to_str();
    return new BigNumber(lockedAda);
  };

  getAvailableBalance = async () => {
    const total = await this.getTotalBalance();
    const collateral = await this.getCollateral();
    const locked = await this.getLockedBalance();

    return total.minus(collateral).minus(locked);
  };

  getUtxos = async () => {
    const rawUtxos = await this.wallet.fullApi.getUtxos();

    const utxos = rawUtxos
      ?.map(this.serializer.hexToBytes)
      .map(TransactionUnspentOutput.from_bytes);

    if (!utxos) return;

    utxos.forEach((utxo) => {
      const coin = utxo.output().amount().coin().to_str();
      console.log({ coin });
    });
  };
}
