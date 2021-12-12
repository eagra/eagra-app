class BigFloat {
  // Configuration: constants
  static DECIMALS = 18; // number of decimals on all instances
  static ROUNDED = true; // numbers are truncated (false) or rounded (true)
  static SHIFT = BigInt("1" + "0".repeat(BigFloat.DECIMALS)); // derived constant
  // private intermediate value
  private _n = BigInt(0);
  private decimalPoints: number = 0;

  constructor(value: string | number | BigFloat) {
    if (value instanceof BigFloat) return value;
    let [ints, decis] = String(value).split(".").concat("");

    this._n =
      BigInt(
        ints + decis.padEnd(BigFloat.DECIMALS, "0").slice(0, BigFloat.DECIMALS)
      ) + BigInt(BigFloat.ROUNDED && decis[BigFloat.DECIMALS] >= "5");
  }

  static fromBigInt(bigint: bigint): BigFloat {
    return Object.assign(Object.create(BigFloat.prototype), { _n: bigint });
  }

  static _divRound(dividend: bigint, divisor: bigint) {
    return BigFloat.fromBigInt(
      dividend / divisor +
        (BigFloat.ROUNDED
          ? ((dividend * BigInt(2)) / divisor) % BigInt(2)
          : BigInt(0))
    );
  }

  add(num: string | number | BigFloat) {
    return BigFloat.fromBigInt(this._n + new BigFloat(num)._n);
  }

  subtract(num: string | number | BigFloat) {
    return BigFloat.fromBigInt(this._n - new BigFloat(num)._n);
  }

  multiply(num: string | number | BigFloat) {
    return BigFloat._divRound(this._n * new BigFloat(num)._n, BigFloat.SHIFT);
  }

  divide(num: string | number | BigFloat) {
    return BigFloat._divRound(this._n * BigFloat.SHIFT, new BigFloat(num)._n);
  }

  trunc(digits: number) {
    this.decimalPoints = digits;
    return this;
  }

  toString() {
    const decimalPoints = this.decimalPoints
      ? -(BigFloat.DECIMALS - this.decimalPoints)
      : -1;

    const stringValue = this._n.toString().padStart(BigFloat.DECIMALS + 1, "0");
    const integers = stringValue.slice(0, -BigFloat.DECIMALS);

    const decimals = stringValue
      .slice(-BigFloat.DECIMALS, decimalPoints)
      .replace(/\.?0+$/, "");

    return decimals.length > 0 ? `${integers}.${decimals}` : integers;
  }
}

export default BigFloat;
