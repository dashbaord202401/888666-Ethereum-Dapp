// Import the Ethers.js library
import ethers from "ethers";

// Create a provider instance for Alchemy
const provider = new ethers.AlchemyProvider("sepolia", "aXDnapjSBPL8eRb9Uq8wNmXCUTMfqkFp");
const contract_address="0x4CFf92D92D0578754ABB10CaE0cf18c82e90Da51";
// Create a contract instance for your CertificateNFT contract
const contract = new ethers.Contract(contract_address, CertificateNFT.abi, provider);

// Issue a certificate to a student
const issueCertificateTransaction = await contract.issueCertificate(
  contract_address,
  "John Doe",
  "Mathematics",
  Date.now(),
  "0x1234567890ABCDEF1234567890ABCDEF12345678"
);

await issueCertificateTransaction.wait();

// Get a certificate for a student
const certificate = await contract.getCertificate(contract_address);

// Watch for the CertificateIssued event
contract.on("CertificateIssued", (certificate) => {
  // Do something with the certificate
});
