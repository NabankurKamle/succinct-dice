import React, { useState } from "react";
import "./Dice3D.css";

interface Dice3DProps {
  onRollComplete: (result: number) => void;
  account: string | null;
}

const Dice3D: React.FC<Dice3DProps> = ({ onRollComplete, account }) => {
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  const playSound = () => {
    const audio = new Audio("/dice.wav"); // Path from `public` folder
    audio.play();
  };

  const rollDice = () => {
    playSound();
    setIsRolling(true);
    setResult(null);

    setTimeout(() => {
      const roll = Math.floor(Math.random() * 6) + 1;
      setResult(roll);
      onRollComplete(roll);
      setIsRolling(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="dice-container">
        <div
          className={`dice ${isRolling ? "rolling" : ""}`}
          onClick={rollDice}
        >
          <div className="face front text-black">{result}</div>
          <div className="face back text-black">{result}</div>
          <div className="face left text-black">{result}</div>
          <div className="face right text-black">{result}</div>
          <div className="face top text-black">{result}</div>
          <div className="face bottom text-black">{result}</div>
        </div>
      </div>
      <button
        onClick={rollDice}
        className="mt-4 bg-pink-800 border-2 border-pink-200 transition-all duration-200 delay-75 text-white px-6 py-3 rounded-lg text-xl hover:bg-pink-700 cursor-pointer disabled:cursor-not-allowed disabled:bg-pink-400"
        disabled={!account}
      >
        Roll Dice
      </button>
    </div>
  );
};

export default Dice3D;
