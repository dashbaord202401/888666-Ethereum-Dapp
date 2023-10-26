/**
* @type import('hardhat/config').HardhatUserConfig
*/
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

//require("@nomicfoundation/hardhat-toolbox");
const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.19",
  defaultNetwork: "mumbai",
  networks: {
    hardhat: {},
    mumbai: {
       url: API_URL,
       accounts: [`0x${PRIVATE_KEY}`]
    }
 },
}
