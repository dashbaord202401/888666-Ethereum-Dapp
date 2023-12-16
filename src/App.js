<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import IssueCertificate from './Issue';
import ViewCertificate from './View';
import { useLocation } from 'react-router-dom';
import {create} from 'ipfs-http-client';

let Redirect = false; // Set to true after redirection

// const client = create({ url: 'http://127.0.0.1:5001' });
//peer identity: 12D3KooWAidW1MSzzaQc4VbjB4V3yg3XYKBQ6pHVNr4eS4XPsGpt
// ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["http://localhost:3000"]'
// ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST", "GET"]'
const client = create({
  host: '127.0.0.1',
  port: 5001,
  protocol: 'http',
});

async function addDataToIPFS() {
  try {
    const { cid } = await client.add('ABCDEFGH');
    console.log(cid);
    return cid;
  } catch (error) {
    console.error('Error adding data to IPFS:', error);
  }
}


async function fetchDataFromIPFS(cid) {
  try {
    const stream = client.cat(cid);
    let fetchedData = '';

    for await (const chunk of stream) {
      const asciiValues = Array.from(chunk);
      const stringValues = asciiValues.map(value => String.fromCharCode(value));
      fetchedData += stringValues.join('');
    }
    console.log('Fetched data:', fetchedData);
  } catch (error) {
    console.error('Error fetching data from IPFS:', error);
  }
}

async function executeIPFSOperations() {
  const cid = await addDataToIPFS();
  fetchDataFromIPFS(cid);
}

executeIPFSOperations();

function App() {
  const [studentAddress, setStudentAddress] = useState('');

  const pathname = useLocation().pathname; // Use the useLocation hook inside the App function

  // Update the flag when visiting the `/view` route
  useEffect(() => {
    if (pathname === '/view') {
      Redirect = false;
    } else if (pathname === '/') {
      Redirect = true;
    }
  }, [pathname]);

  // Handle issue certificate and redirect to view certificate page
  const handleIssueCertificateAndRedirect = async () => {
    try {
      await IssueCertificate(); // Call the issueCertificate function
      Router.push('/view'); // Redirect to the view certificate page
      Redirect = true; // Update the flag after redirection
    } catch (error) {
      console.error('Error issuing certificate:', error);
      alert('Failed to issue certificate');
    }
  };


  // const ipfs = new IPFS({ host: 'http://127.0.0.1', port: 8080, protocol: 'https' });
  // const addDataToIPFS = () => {
  //   const data = "Hello World";
  //   ipfs.add(data, (err, hash) => {
  //     if (err) {
  //       return console.log(err);
  //     }
  //     console.log("https://127.0.0.1/" + hash);
  //   });

  // }
  // addDataToIPFS();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',

    }}>
      <Routes>
        <Route exact path="/" element={<IssueCertificate issueCertificateAndRedirect={handleIssueCertificateAndRedirect} />} />
        <Route path="/view" element={<ViewCertificate studentAddress={studentAddress} />} />
      </Routes>


      {/* Conditional rendering based on the flag */}
      {Redirect === false &&
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Link to="/view">
            <button>Go to View</button>
          </Link>
        </div>
      }

      {Redirect === true &&
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Link to="/">
            <button>Go to Issue</button>
          </Link>
        </div>
      }

    </div>
  );
}

export default App;




=======
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
>>>>>>> e33b69e785868c0396dbf7b65812259fe8b92c41
