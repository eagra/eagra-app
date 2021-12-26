import { Address, Value } from "@emurgo/cardano-serialization-lib-browser";

// Convert a hex string to a byte array
export const hexToBytes = (hex: string) => {
  const byteArray = [];
  for (let c = 0; c < hex.length; c += 2) {
    byteArray.push(parseInt(hex.substr(c, 2), 16));
  }

  return new Uint8Array(byteArray);
};

// Convert a byte array to a hex string
export const bytesToHex = (bytes: Uint8Array) => {
  const hex = [];
  for (let i = 0; i < bytes.length; i++) {
    var current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
    hex.push((current >>> 4).toString(16));
    hex.push((current & 0xf).toString(16));
  }
  return hex.join("");
};

// convert hex string to ascii
export const hexToAscii = (hex: string) => {
  let charArray: string[] = [];
  let i = 0;

  if (hex.substring(0, 2) === "0x") {
    i = 2;
  }

  for (; i < hex.length; i += 2) {
    var code = parseInt(hex.substr(i, 2), 16);
    charArray.push(String.fromCharCode(code));
  }

  return charArray.join("");
};

// convert ascii string to hex
export const asciiToHex = (ascii: string) => {
  if (!ascii) return new Error("ascii string must be provided");
  let hex = "";

  for (let i = 0; i < ascii.length; i++) {
    const char = ascii.charCodeAt(i).toString(16);
    hex += char.length < 2 ? "0" + char : char;
  }

  return "0x" + hex;
};

export const hexToValue = (hex: string) => {
  const value = hexToBytes(hex);
  return Value.from_bytes(value);
};

export const hexToAddress = (hex: string) => {
  return Address.from_bytes(hexToBytes(hex));
};
