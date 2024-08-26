import { NextResponse } from "next/server";
import crypto from "crypto";
import bs58 from "bs58";

function generateBitcoinAddress(publicKey: Buffer): string {
  // Hash the public key with SHA-256 and then RIPEMD-160
  const sha256 = crypto.createHash("sha256").update(publicKey).digest();
  const ripemd160 = crypto.createHash("ripemd160").update(sha256).digest();

  // Add network byte (0x00 for Bitcoin mainnet)
  const networkByte = Buffer.from([0x00]);

  // Create checksum
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

  // Concatenate network byte, RIPEMD-160 hash, and checksum
  const address = Buffer.concat([networkByte, ripemd160, checksum]);

  // Encode address in Base58
  return bs58.encode(address);
}

export async function GET() {
  // Generate key pair
  const { publicKey, privateKey } = crypto.generateKeyPairSync("ec", {
    namedCurve: "secp256k1",
    publicKeyEncoding: { type: "spki", format: "der" },
    privateKeyEncoding: { type: "pkcs8", format: "der" },
  });

  // Use the public key directly as a Buffer
  const publicKeyBuffer = Buffer.from(publicKey);

  // Generate Bitcoin address from public key
  const bitcoinAddress = generateBitcoinAddress(publicKeyBuffer);

  // Prepare keys and address
  const keys = {
    publicKey: publicKey.toString("hex"),
    privateKey: privateKey.toString("hex"),
    bitcoinAddress,
  };

  // Return the keys and address in the response
  return NextResponse.json(keys);
}
