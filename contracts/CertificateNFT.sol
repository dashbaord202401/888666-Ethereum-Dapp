// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Importing OpenZeppelin's ECDSA library for ECC signatures
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract CertificateNFT {
    using ECDSA for bytes32;

    // Struct to represent a certificate
    struct Certificate {
        address studentAddress;
        string studentName;
        string subject;
        uint256 issueTimestamp;
        bytes signature;
    }

    // Mapping to store certificates
    mapping(address => Certificate) public certificates;

    // Function to issue a certificate to a student
    function issueCertificate(
        address studentAddress,
        string memory studentName,
        string memory subject,
        uint256 issueTimestamp,
        bytes memory signature
    ) external {
        // Verify the signature using the student's address and certificate data
        bytes32 certificateHash = keccak256(abi.encodePacked(studentAddress, studentName, subject, issueTimestamp));
        require(certificateHash.toEthSignedMessageHash().recover(signature) == studentAddress, "Invalid signature");

        // Store the certificate
        certificates[studentAddress] = Certificate(studentAddress, studentName, subject, issueTimestamp, signature);
    }

    // Function to get a certificate for a student
    function getCertificate(address studentAddress) external view returns (Certificate memory) {
        return certificates[studentAddress];
    }
}
