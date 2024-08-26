import WalletUI from "../../components/WalletUI";
import { generateKeys } from "../../utils/cryptoUtils";

export default function WalletPage() {
  const { publicKey, privateKey, bitcoinAddress } = generateKeys();

  return (
    <div>
      <h1>Your Bitcoin Wallet</h1>
      <WalletUI
        publicKey={publicKey}
        privateKey={privateKey}
        bitcoinAddress={bitcoinAddress}
      />
    </div>
  );
}
