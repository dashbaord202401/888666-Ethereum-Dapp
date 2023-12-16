// src/components/ViewCertificateData.js
import React, { useState } from 'react';

const ViewCertificateData = ({ onViewCertificateData }) => {
  const [studentAddress, setStudentAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = await onViewCertificateData(studentAddress);

    setLoading(false);
    if (data) {
      alert('Certificate data loaded successfully!');
      // Display the certificate data as needed
    } else {
      alert('Error fetching certificate data. Check console for details.');
      console.error('Error fetching certificate data.');
    }
  };

  return (
    <div>
      <h1>View Certificate Data</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="studentAddress">Your Address:</label>
        <input
          type="text"
          id="studentAddress"
          name="studentAddress"
          value={studentAddress}
          onChange={(e) => setStudentAddress(e.target.value)}
          required
        /><br />

        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'View Certificate Data'}
        </button>
      </form>
    </div>
  );
};

export default ViewCertificateData;
