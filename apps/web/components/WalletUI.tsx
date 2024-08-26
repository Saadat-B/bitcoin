// WalletUI.tsx
"use client";

import { useState } from "react";

interface WalletUIProps {
  publicKey: string;
  privateKey: string;
  bitcoinAddress: string;
}

export default function WalletUI() {
  const [keys, setKeys] = useState({
    publicKey: "sdfasdf",
    privateKey: "sdfsadfsadf",
    bitcoinAddress: "sdfs",
  });

  const handleClick = async () => {
    const response = await fetch("/api/generateKeys");
    const newKeys = await response.json();
    setKeys(newKeys);
  };
  return (
    <div>
      <button onClick={handleClick}>Create Wallet</button>
      <h2>Public Key</h2>
      <pre>{keys?.publicKey}</pre>
      <h2>Private Key</h2>
      <pre>{keys?.privateKey}</pre>
      <h2>Bitcoin Address</h2>
      <pre>{keys?.bitcoinAddress}</pre>
    </div>
  );
}
