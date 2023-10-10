const { ethers } = require("hardhat");

async function main() {
    const nft = await ethers.getContractFactory("CertificateNFT");
    const contract = await nft.deploy();
    console.log("Contract address:", contract.address); // Use contract.address here
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });