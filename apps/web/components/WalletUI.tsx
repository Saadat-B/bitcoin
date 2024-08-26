interface WalletUIProps {
  publicKey: string;
  privateKey: string;
  bitcoinAddress: string;
}

export default function WalletUI({
  publicKey,
  privateKey,
  bitcoinAddress,
}: WalletUIProps) {
  return (
    <div>
      <h2>Public Key</h2>
      <pre>{publicKey}</pre>
      <h2>Private Key</h2>
      <pre>{privateKey}</pre>
      <h2>Bitcoin Address</h2>
      <pre>{bitcoinAddress}</pre>
    </div>
  );
}
