// src/App.js
import React, { useState } from 'react';
import IssueCertificateForm from './certIssue.js';
import ViewCertificateData from './ViewCert.js';

function App() {
  const [certificateData, setCertificateData] = useState(null);

  const handleCertificateIssued = async (result) => {
    // Assume the result contains a 'success' property indicating the success of the certificate issuance
    if (result.success) {
      setCertificateData(null); // Clear previous certificate data
    } else {
      // Handle error
      console.error(result.error);
    }
  };

  const handleViewCertificateData = async (studentAddress) => {
    try {
      // Fetch and display certificate data
      // ... (use similar logic as before)

      // Return the certificate data (modify based on the actual structure of your certificate data)
      return {
        studentName: 'John Doe',
        degreeName: 'Computer Science',
        subject: 'Blockchain',
        issueTimestamp: new Date(),
      };
    } catch (error) {
      console.error("Error fetching certificate data:", error);
      return null;
    }
  };

  return (
    <div>
      {/* Decide which component to render based on user's role */}
      {isUniversityAuthority ? (
        <IssueCertificateForm onCertificateIssued={handleCertificateIssued} />
      ) : (
        <ViewCertificateData onViewCertificateData={handleViewCertificateData} />
      )}

      {certificateData && (
        <div>
          <h2>Certificate Data</h2>
          <p>Student Name: {certificateData.studentName}</p>
          <p>Degree Name: {certificateData.degreeName}</p>
          <p>Subject: {certificateData.subject}</p>
          <p>Issue Timestamp: {certificateData.issueTimestamp.toString()}</p>
        </div>
      )}
    </div>
  );
}

export default App;
