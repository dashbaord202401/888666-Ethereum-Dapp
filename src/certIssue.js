import React, { useState } from 'react';
import { issueCertificates } from './scripts/interact.js';

const IssueCertificateForm = ({ onCertificateIssued }) => {
  const [studentName, setStudentName] = useState('');
  const [degreeName, setDegreeName] = useState('');
  const [subject, setSubject] = useState('');
  const [studentAddress, setStudentAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await issueCertificates(studentName, degreeName, subject, studentAddress);

    setLoading(false);
    onCertificateIssued(result);
  };

  return (
    <div>
      <h1>Issue Certificate</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="studentName">Student Name:</label>
        <input
          type="text"
          id="studentName"
          name="studentName"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          required
        /><br />

        <label htmlFor="degreeName">Degree Name:</label>
        <input
          type="text"
          id="degreeName"
          name="degreeName"
          value={degreeName}
          onChange={(e) => setDegreeName(e.target.value)}
          required
        /><br />

        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        /><br />

        <label htmlFor="studentAddress">Student Address:</label>
        <input
          type="text"
          id="studentAddress"
          name="studentAddress"
          value={studentAddress}
          onChange={(e) => setStudentAddress(e.target.value)}
          required
        /><br />

        <button type="submit" disabled={loading}>
          {loading ? 'Issuing...' : 'Issue Certificate'}
        </button>
      </form>
    </div>
  );
};

export default IssueCertificateForm;
