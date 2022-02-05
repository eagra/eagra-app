import { Address, Value } from '@emurgo/cardano-serialization-lib-browser';
import AssetFingerprint from '@emurgo/cip14-js';
import { bech32 } from 'bech32';
import { Buffer as B } from 'buffer';
import { Cbor } from '../injected';

export type Asset = {
  unit: string;
  quantity: string;
  policy?: string;
  name?: string;
  fingerprint?: string;
  metadata?: Record<string, unknown>;
};

export class Serializer {
  bech32ToHex = (encoded: string) => {
    const { words } = bech32.decode(encoded);
    return B.from(bech32.fromWords(words)).toString('hex');
  };

  hexToBytes = <T>(hex: Cbor<T>) => {
    const byteArray = [];
    for (let c = 0; c < hex.length; c += 2) {
      byteArray.push(parseInt(hex.substr(c, 2), 16));
    }

    return new Uint8Array(byteArray);
  };

  // Convert a byte array to a hex string
  bytesToHex = (bytes: Uint8Array) => {
    const hex: string[] = [];
    for (let i = 0; i < bytes.length; i++) {
      const current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
      hex.push((current >>> 4).toString(16));
      hex.push((current & 0xf).toString(16));
    }
    return hex.join('');
  };

  // convert hex string to ascii
  hexToAscii = (hex: string) => {
    const charArray: string[] = [];
    let i = 0;

    if (hex.substring(0, 2) === '0x') {
      i = 2;
    }

    for (; i < hex.length; i += 2) {
      const code = parseInt(hex.substr(i, 2), 16);
      charArray.push(String.fromCharCode(code));
    }

    return charArray.join('');
  };

  asciiToHex = (ascii: string) => {
    if (!ascii) return new Error('ascii string must be provided');
    let hex = '';

    for (let i = 0; i < ascii.length; i++) {
      const char = ascii.charCodeAt(i).toString(16);
      hex += char.length < 2 ? '0' + char : char;
    }
    return '0x' + hex;
  };

  hexToValue = (hex: Cbor<Value>) => {
    return Value.from_bytes(this.hexToBytes<Value>(hex));
  };

  hexToAddress = (hex: Cbor<Address>) => {
    return Address.from_bytes(this.hexToBytes<Address>(hex));
  };

  assetFingerprint = (policy: string, name: string) => {
    return AssetFingerprint.fromParts(
      B.from(policy, 'hex'),
      B.from(name, 'hex')
    ).fingerprint();
  };

  valueToAssets = (balance: Value): Asset[] => {
    const assets: Asset[] = [];
    const multiasset = balance.multiasset();
    // if assets not detected, return empty
    if (!multiasset) return assets;

    const multiAssets = multiasset.keys();
    for (let j = 0; j < multiAssets.len(); j++) {
      const policy = multiAssets.get(j);
      const policyAssets = multiasset.get(policy);

      const assetNames = policyAssets?.keys();

      if (!assetNames) {
        continue;
      }

      for (let k = 0; k < assetNames?.len(); k++) {
        const policyAsset = assetNames.get(k);
        const quantity = policyAssets?.get(policyAsset);

        const unit =
          this.bytesToHex(policy.to_bytes()) +
          this.bytesToHex(policyAsset.name());

        const _policy = unit.slice(0, 56);
        const _name = unit.slice(56);

        const fingerprint = this.assetFingerprint(_policy, _name);

        if (!quantity)
          throw new Error(`quantity is required for asset ${unit}`);

        assets.push({
          unit,
          quantity: quantity?.to_str(),
          policy: _policy,
          name: this.hexToAscii(_name),
          fingerprint,
        });
      }
    }

    return assets;
  };
}
