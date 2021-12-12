import {
  Ed25519KeyHash,
  StakeCredential,
  Address,
  BaseAddress,
} from "@emurgo/cardano-serialization-lib-browser";
import { CardanoApi } from "../hooks/useCardano";
import { hexToAddress } from "./serializer";

export type ParsedAddress = {
  payment_cred: StakeCredential | undefined;
  stake_cred: Ed25519KeyHash | undefined;
  address: string | undefined;
};

export const addressToBaseAddress = (address: Address) => {
  const baseAddress = BaseAddress.from_address(address);

  return {
    payment_cred: baseAddress?.payment_cred(),
    stake_cred: baseAddress?.stake_cred().to_keyhash(),
    address: baseAddress?.to_address().to_bech32(),
  };
};

export const getAddresses = async (
  cardano: CardanoApi
): Promise<ParsedAddress[]> => {
  if (!cardano) throw new Error("cardano injected api not found");

  const addresses = (await cardano.getUsedAddresses()) ?? [];
  return addresses.map((rawAddress: string) =>
    addressToBaseAddress(hexToAddress(rawAddress))
  );
};

export const getRewardAddress = async (
  cardano: CardanoApi
): Promise<string> => {
  if (!cardano) throw new Error("cardano injected api not found");

  const rewardAddressRaw = await cardano.getRewardAddress();
  const rewardAddress = hexToAddress(rewardAddressRaw).to_bech32();

  if (!rewardAddress) throw Error("could not get reward address");

  return rewardAddress;
};
