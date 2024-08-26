const crypto = require("crypto");
const bs58 = require("bs58");

interface GeneratedKeys {
  publicKey: string;
  privateKey: string;
  bitcoinAddress: string;
}

export function generateKeys(): GeneratedKeys {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("ec", {
    namedCurve: "secp256k1",
    publicKeyEncoding: { type: "spki", format: "der" },
    privateKeyEncoding: { type: "pkcs8", format: "der" },
  });

  const bitcoinAddress = generateBitcoinAddress(publicKey);

  return {
    publicKey: publicKey.toString("hex"),
    privateKey: privateKey.toString("hex"),
    bitcoinAddress,
  };
}

function generateBitcoinAddress(publicKey: Buffer): string {
  const sha256 = crypto.createHash("sha256").update(publicKey).digest();
  const ripemd160 = crypto.createHash("ripemd160").update(sha256).digest();

  const networkByte = Buffer.from([0x00]);
  const checksum = crypto
    .createHash("sha256")
    .update(
      crypto
        .createHash("sha256")
        .update(Buffer.concat([networkByte, ripemd160]))
        .digest()
    )
    .digest()
    .slice(0, 4);

  const address = Buffer.concat([networkByte, ripemd160, checksum]);

  return bs58.default.encode(address);
}
