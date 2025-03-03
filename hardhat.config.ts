require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

import "@nomicfoundation/hardhat-ethers";
import "@typechain/hardhat"; // 👈 Add this

module.exports = {
  solidity: "0.8.18", // Ensure this matches your DiceGame.sol pragma version
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
