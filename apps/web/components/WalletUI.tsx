// WalletUI.tsx
"use client";

import { useState } from "react";

type Wallet = {
  publicKey: string;
  privateKey: string;
  bitcoinAddress: string;
};

export default function WalletUI() {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [keys, setKeys] = useState({
    publicKey: "sdfasdf",
    privateKey: "sdfsadfsadf",
    bitcoinAddress: "sdfs",
  });

  const handleClick = async () => {
    const response = await fetch("/api/generateKeys");
    const newKeys = await response.json();
    setKeys(newKeys);

    setWallets((prev) => [...prev, newKeys]);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button
        style={{
          width: "50%",
          padding: "20px",
          margin: "20px ",
          fontSize: "40px",
        }}
        onClick={handleClick}
      >
        Create Wallet
      </button>
      <br />

      {wallets.map((wallet) => (
        <div
          style={{
            fontSize: "20px",
            wordWrap: "break-word", // Use wordWrap instead of textWrap
            width: "100%",
            display: "flex",
            flexDirection: "column",
            border: "1px solid white",
            marginBottom: "10px",
            padding: "5px",
          }}
        >
          <h2>Public Key</h2>
          <div>{wallet?.publicKey}</div>
          <h2>Private Key</h2>
          <div
            style={{
              wordWrap: "break-word", // Use wordWrap instead of textWrap
            }}
          >
            {wallet?.privateKey}
          </div>
          <h2>Bitcoin Address</h2>
          <div>{wallet?.bitcoinAddress}</div>
          <br />
        </div>
      ))}
    </div>
  );
}
