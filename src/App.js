import React, { useState } from 'react';
import { ethers } from 'ethers';

function ContractInteraction() {
    const [studentName, setStudentName] = useState('');
    const [degreeName, setDegreeName] = useState('');
    const [subject, setSubject] = useState('');
    const [studentAddress, setStudentAddress] = useState('');
    const [issueResult, setIssueResult] = useState('');

    // Replace with your contract address
    const CONTRACT_ADDRESS = 'YOUR_CONTRACT_ADDRESS';
    const API_KEY = 'YOUR_ALCHEMY_API_KEY';
    const PRIVATE_KEY = 'YOUR_PRIVATE_KEY';

    const issueCertificate = async () => {
        try {
            const provider = new ethers.providers.AlchemyProvider(ethers.providers.networks.mainnet, API_KEY);
            const signer = new ethers.Wallet(PRIVATE_KEY, provider);

            const contractABI = [
                // Include the ABI of your CertificateNFT contract here
                // Example: ['function issueCertificate(string, string, string, address, uint256) public']
            ];

            const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

            const issueTimestamp = Math.floor(Date.now() / 1000); // Get current timestamp

            const transaction = await contract.issueCertificate(studentName, degreeName, subject, studentAddress, issueTimestamp);

            await transaction.wait();

            setIssueResult('Certificate issued successfully!');
        } catch (error) {
            console.error('Error issuing certificate:', error);
            setIssueResult('Failed to issue certificate');
        }
    };

    return (
        <div>
            <h1>Issue Certificate</h1>
            <input type="text" placeholder="Student Name" onChange={(e) => setStudentName(e.target.value)} />
            <input type="text" placeholder="Degree Name" onChange={(e) => setDegreeName(e.target.value)} />
            <input type="text" placeholder="Subject" onChange={(e) => setSubject(e.target.value)} />
            <input type="text" placeholder="Student Address" onChange={(e) => setStudentAddress(e.target.value)} />
            <button onClick={issueCertificate}>Issue Certificate</button>
            <p>{issueResult}</p>
        </div>
    );
}

export default ContractInteraction;
