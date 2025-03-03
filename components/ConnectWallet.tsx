import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ethers } from "ethers";

const WalletConnect = ({
  account,
  setAccount,
}: {
  account: string | null;
  setAccount: Dispatch<SetStateAction<string | null>>;
}) => {
  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      // Create a new provider using window.ethereum (MetaMask)
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
    } else {
      alert("Please install MetaMask");
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        setAccount(accounts[0]);
      });
    }
  }, []);

  return (
    <div className="mb-6 z-[100]">
      {account ? (
        <div className="flex flex-col items-center">
          <p className="text-xl">Connected: {account}</p>
          <button
            onClick={disconnectWallet}
            className="mt-4 bg-pink-200 px-6 py-3 rounded-lg text-xl hover:bg-pink-700 cursor-pointer text-black"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-xl">Please connect your wallet</p>
          <button
            onClick={connectWallet}
            className="mt-4 bg-pink-200  px-6 py-3 rounded-lg text-xl hover:bg-pink-700 cursor-pointer text-black"
          >
            Connect Wallet
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
