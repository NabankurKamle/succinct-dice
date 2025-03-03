// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract DiceGame {
    address public owner;
    uint256 public minBet = 0.001 ether;

    event BetResult(address indexed player, uint256 roll, bool win, uint256 amountWon);

    constructor() {
        owner = msg.sender;
    }

    function placeBet() public payable {
        require(msg.value >= minBet, "Bet amount too low");

        uint256 roll = (block.timestamp + block.difficulty) % 6 + 1; // Generate random number (1-6)
        bool win = roll > 3;

        uint256 reward = 0;
        if (win) {
            reward = msg.value * 2;
            payable(msg.sender).transfer(reward);
        }

        emit BetResult(msg.sender, roll, win, reward);
    }

    receive() external payable {}

    function withdraw() external {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }
}
