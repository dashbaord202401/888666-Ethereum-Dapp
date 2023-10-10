require("@nomicfoundation/hardhat-toolbox");

const ALCHEMY_API_KEY = "aXDnapjSBPL8eRb9Uq8wNmXCUTMfqkFp";
const SEPOLIA_PRIVATE_KEY="ea9958663da67667a35dfbdfdfa621b8be64960e54a60d7440f68ab9d40c143c"
module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  }
};