import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';

// Import the ABI (Application Binary Interface) of the Solidity contract
import CertificateContract from './contracts/CertificateIssuer.json';

function App() {
  const [account, setAccount] = useState('');
  const [studentName, setStudentName] = useState('');
  const [subject, setSubject] = useState('');
  const [issueTimestamp, setIssueTimestamp] = useState('');
  const [certificate, setCertificate] = useState(null);

  // Alchemy API Key
  const alchemyApiKey = 'uwxyI6fu3jZu_7bsMjaNrGOtx7kzT_5G';

  // Replace with your contract address
  const contractAddress = 'YOUR_CONTRACT_ADDRESS';

  const loadBlockchainData = async () => {
    // Connect to MetaMask
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const accounts = await provider.listAccounts();
      setAccount(accounts[0]);
    } else {
      alert('MetaMask not detected. Please install MetaMask.');
    }
  };

  const issueCertificate = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(alchemyApiKey);
      const contract = new ethers.Contract(contractAddress, CertificateContract.abi, provider);
      const signer = provider.getSigner();
      const issueTimestampNumber = parseInt(issueTimestamp);

      // Sign the certificate data
      const message = ethers.utils.solidityKeccak256(
        ['address', 'string', 'string', 'uint256'],
        [account, studentName, subject, issueTimestampNumber]
      );
      const signature = await signer.signMessage(message);

      // Send the transaction to issue the certificate
      const tx = await contract.issueCertificate(account, studentName, subject, issueTimestampNumber, signature);
      await tx.wait();

      alert('Certificate issued successfully!');
    } catch (error) {
      console.error('Error issuing certificate:', error);
    }
  };

  const getCertificate = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(alchemyApiKey);
      const contract = new ethers.Contract(contractAddress, CertificateContract.abi, provider);

      // Call the contract to retrieve the certificate
      const cert = await contract.getCertificate(account);
      setCertificate(cert);
    } catch (error) {
      console.error('Error retrieving certificate:', error);
    }
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Certificate Issuer App</h1>
        <p>Connected Account: {account}</p>

        <div>
          <h2>Issue Certificate</h2>
          <input
            type="text"
            placeholder="Student Name"
            onChange={(e) => setStudentName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Subject"
            onChange={(e) => setSubject(e.target.value)}
          />
          <input
            type="number"
            placeholder="Issue Timestamp"
            onChange={(e) => setIssueTimestamp(e.target.value)}
          />
          <button onClick={issueCertificate}>Issue</button>
        </div>

        <div>
          <h2>View Certificate</h2>
          <button onClick={getCertificate}>View</button>
          {certificate && (
            <div>
              <p>Student Name: {certificate.studentName}</p>
              <p>Subject: {certificate.subject}</p>
              <p>Issued at: {new Date(certificate.issueTimestamp * 1000).toLocaleString()}</p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
