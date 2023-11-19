import React, { useEffect, useState } from 'react';
import { issueCertificate } from './interact'; // Import the function to issue certificates

function App() {
  const [issueResult, setIssueResult] = useState('');

  useEffect(() => {
    async function runIssueCertificate() {
      try {
        const result = await issueCertificate("Alice", "BSC", "Mathematics", "0x3D36dB21186e89cA195790d39c573568dD1cD09B", Math.floor(Date.now() / 1000));
        setIssueResult(result);
      } catch (error) {
        console.error('Error issuing certificate:', error);
        setIssueResult('Failed to issue certificate');
      }
    }

    runIssueCertificate();
  }, []);

  return (
    <div className="App">
      <h1>Certificate Issuance</h1>
      <p>{issueResult}</p>
      {/* Other components */}
    </div>
  );
}

export default App;
