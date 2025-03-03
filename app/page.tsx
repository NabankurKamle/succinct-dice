"use client";

import React, { useState } from "react";
import Dice3D from "../components/Dice3d"; // Import 3D Dice component
import WalletConnect from "../components/ConnectWallet"; // Wallet Connect Component
import confetti from "canvas-confetti"; // Wallet Connect Component

const DiceGame = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(1);
  const [diceRoll, setDiceRoll] = useState<number | null>(null);
  const [resultMessage, setResultMessage] = useState<string>("");

  const handleSelectNumber = (number: number) => {
    setSelectedNumber(number);
  };

  const playSound = () => {
    const audio = new Audio("/yay.wav"); // Path from `public` folder
    audio.play();
  };
  const playOpsSound = () => {
    const audio = new Audio("/ops.wav"); // Path from `public` folder
    audio.play();
  };

  const shootRealisticCofetti = () => {
    const count = 200;
    const defaults = {
      origin: { x: 0.5, y: 0.5 },
    };

    function fire(particleRatio: number, opts: object) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const handleRollComplete = (roll: number) => {
    setDiceRoll(roll);
    if (roll === selectedNumber) {
      setResultMessage("🎉 You win!");
      shootRealisticCofetti();
      playSound();
    } else {
      setResultMessage("Better luck next time!");
      playOpsSound();
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-pink-500 via-pink-600 to-pink-500 text-white relative">
      {/* Wallet Connect */}
      <img
        src={"/succinct.svg"}
        className="absolute h-[600px] top-28 left-10"
      />
      <img
        src={"/succinct.svg"}
        className="absolute h-[600px] top-28 right-10"
      />

      <WalletConnect setAccount={setAccount} account={account} />

      <div className="mt-6 z-[100]">
        <h3 className="text-2xl font-semibold mb-4 text-center">
          Choose a number
        </h3>
        <div className="flex space-x-4 mb-6">
          {[1, 2, 3, 4, 5, 6].map((number) => (
            <button
              key={number}
              onClick={() => handleSelectNumber(number)}
              className={`px-6 py-3 rounded-lg text-xl transition-all duration-200 delay-75 cursor-pointer border-2 border-white text-black font-semibold ${
                selectedNumber === number
                  ? "bg-pink-800 text-white"
                  : "bg-pink-300"
              } hover:bg-pink-800 hover:text-white`}
            >
              {number}
            </button>
          ))}
        </div>

        <div className="mb-6 z-[100]">
          <Dice3D onRollComplete={handleRollComplete} account={account} />
        </div>

        {resultMessage && (
          <p className="mt-4 text-2xl font-semibold text-center">
            {resultMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default DiceGame;
