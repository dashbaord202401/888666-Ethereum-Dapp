async function main() {

  // Get the contract factory
  const MyNFT = await ethers.getContractFactory("CertificateNFT");
 // Start deployment, returning a promise that resolves to a contract object
  const myNFT = await MyNFT.deploy()
  if (myNFT.address) {
    await myNFT.deployed();
    console.log("Deployment complete");
    console.log("The address of the contract is->"+myNFT.address);
  } else {
    console.error("Invalid contract object");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  //0x4CFf92D92D0578754ABB10CaE0cf18c82e90Da51