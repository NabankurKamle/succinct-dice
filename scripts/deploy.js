const hre = require("hardhat");

async function main() {
  const DiceGame = await hre.ethers.getContractFactory("DiceGame");
  const diceGame = await DiceGame.deploy();

  await diceGame.waitForDeployment();

  console.log("Contract deployed to:", await diceGame.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
