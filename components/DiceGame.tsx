import React, { useState } from "react";
import Dice3D from "./Dice3d"; // Import 3D Dice component
import WalletConnect from "./ConnectWallet"; // Wallet Connect Component

const DiceGame = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [diceRoll, setDiceRoll] = useState<number | null>(null);
  const [resultMessage, setResultMessage] = useState<string>("");

  const handleSelectNumber = (number: number) => {
    setSelectedNumber(number);
  };

  const handleRollComplete = (roll: number) => {
    setDiceRoll(roll);
    if (roll === selectedNumber) {
      setResultMessage("🎉 You win!");
    } else {
      setResultMessage("Better luck next time!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 text-white">
      {/* Wallet Connect */}
      <WalletConnect account={account} setAccount={setAccount} />

      <div className="mt-6">
        <h3 className="text-2xl font-semibold mb-4">
          Choose a number between 1 and 6
        </h3>
        <div className="flex space-x-4 mb-6">
          {[1, 2, 3, 4, 5, 6].map((number) => (
            <button
              key={number}
              onClick={() => handleSelectNumber(number)}
              className={`px-6 py-3 rounded-lg text-xl ${
                selectedNumber === number ? "bg-pink-800" : "bg-pink-600"
              } hover:bg-pink-700`}
            >
              {number}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <Dice3D onRollComplete={handleRollComplete} account={account} />
        </div>
        {resultMessage && (
          <p className="mt-4 text-2xl font-semibold">{resultMessage}</p>
        )}
      </div>
    </div>
  );
};

export default DiceGame;
