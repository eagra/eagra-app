import {
  Address,
  Transaction,
  TransactionUnspentOutput,
  TransactionWitnessSet,
  Value,
} from '@emurgo/cardano-serialization-lib-browser';

/** LEGACY
 * 
 window.cardano = {
  ...(window.cardano || {}),
  enable: () => enable(),
  isEnabled: () => isEnabled(),
  getBalance: () => getBalance(),
  signData: (address, payload) => signData(address, payload),
  signTx: (tx, partialSign) => signTx(tx, partialSign),
  submitTx: (tx) => submitTx(tx),
  getUtxos: (amount, paginate) => getUtxos(amount, paginate),
  getCollateral: () => getCollateral(),
  getUsedAddresses: async () => [await getAddress()],
  getUnusedAddresses: async () => [],
  getChangeAddress: () => getAddress(),
  getRewardAddress: () => getRewardAddress(),
  getNetworkId: () => getNetworkId(),
  onAccountChange: (callback) => on(EVENT.accountChange, callback),
  onNetworkChange: (callback) => on(EVENT.networkChange, callback),
  off,
  _events: {},
};
 */

/** CIP-0030
window.cardano =  {
  nami: {
    enable: async () => {
      if (await enable()) {
        return {
          getBalance: () => getBalance(),
          signData: (address, payload) => signData(address, payload),
          signTx: (tx, partialSign) => signTx(tx, partialSign),
          submitTx: (tx) => submitTx(tx),
          getUtxos: (amount, paginate) => getUtxos(amount, paginate),
          getCollateral: () => getCollateral(),
          getUsedAddresses: async () => [await getAddress()],
          getUnusedAddresses: async () => [],
          getChangeAddress: () => getAddress(),
          getRewardAddresses: async () => [await getRewardAddress()],
          getNetworkId: () => getNetworkId(),
          onAccountChange: (callback) => onAccountChange(callback),
          onNetworkChange: (callback) => onNetworkChange(callback),
        };
      }
    },
    isEnabled: () => isEnabled(),
    apiVersion: '0.1.0',
    name: 'Nami',
    icon: 'https://raw.githubusercontent.com/Berry-Pool/nami-wallet/main/src/assets/img/logo.svg',
  }
}
*/

export type InjectedWindow = Window &
  typeof globalThis & { cardano: InjectedApiType };

// TODO this will need to be fixed.
// Ideally, ideally we want to be able to tell what is going to be the output of Cbor through this type
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Cbor<T> = string;

export type Paginate = {
  page: number;
  limit: number;
};

export type WalletName = string;
export type ExperimentalApi = Record<string, unknown>;

export type FullApi = {
  experimental: ExperimentalApi;
  getNetworkId: () => Promise<number>;
  getUtxos: (
    amount?: Cbor<Value>,
    paginate?: Paginate
  ) => Promise<Cbor<TransactionUnspentOutput>[] | undefined>;
  getBalance: () => Promise<Cbor<Value>>;
  getUsedAddresses: (paginate: Paginate) => Promise<Cbor<Address>[]>;
  getUnusedAddresses: () => Promise<Cbor<Address>[]>;
  getRewardAddresses: () => Promise<Cbor<Address>[]>;
  getChangeAddress: () => Promise<Cbor<Address>>;
  signTx: (
    tx: Cbor<Transaction>,
    partialSign: boolean,
    createDebugTx?: boolean
  ) => Promise<Cbor<TransactionWitnessSet>>;
  submitTx: (tx: Cbor<Transaction>) => Promise<string>;
  // TODO
  signData: (
    addr: Cbor<Address>,
    sigStructure: Cbor<unknown>
  ) => Promise<Cbor<string>>;
};

export type WalletApi = {
  apiVersion: string;
  name: string;
  icon: string;
  isEnabled: () => Promise<boolean>;
  enable: () => Promise<FullApi>;
  experimental?: ExperimentalApi;
};

export type InjectedApiType = Record<WalletName, WalletApi> | undefined;

export class InjectedApi {
  injected: InjectedApiType;

  public constructor() {
    this.injected = (window as InjectedWindow).cardano;
  }

  public init = (walletKey: string): Promise<FullApi> => {
    if (!this.injected) throw new Error('wallet not detected');

    const wallet = this.injected[walletKey];
    if (!wallet) throw new Error('wallet not detected');

    const fullApi = wallet.enable();
    return fullApi;
  };

  public enabled = (): Promise<WalletApi | undefined> => {
    return new Promise((resolve, reject) => {
      if (!this.injected) return reject('wallet not detected');
      Object.values(this.injected).find((wallet) => {
        // nami polluted top level cardano object
        if (!wallet.apiVersion) {
          return;
        }

        return wallet.isEnabled().then((isEnabled) => {
          if (isEnabled) resolve(wallet);
        });
      });
    });
  };
}
