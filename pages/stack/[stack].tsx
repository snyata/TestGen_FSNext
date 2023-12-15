// pages/stack/[stack].tsx
import React, { useEffect, useState } from 'react';
import { parse } from 'papaparse'; // npm install papaparse
import { useRouter } from 'next/router';
import WelcomePopup from '../components/welcomePopup'; // Adjust the path as necessary
import styles from '../styles/Table.module.css';
import Footer from '../components/Footer';
import Cookies from 'js-cookie';

const StackPage: React.FC = () => {
  const router = useRouter();
  const { stack } = router.query;
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [csvData, setCsvData] = useState([]);
  const [filters, setFilters] = useState({
    Page: '',
    Action: '',
    Module: '',
    Element: '',
  });

  const username = Cookies.get('username') || 'Guest'; // Default to 'Guest' if not found

  return <div>Welcome, {username}!</div>;
};


  const loadCsvData = async () => {
    const response = await fetch('/path-to-your-csv-file.csv');
    const text = await response.text();
    parse(text, {
      header: true,
      complete: (result) => setCsvData(result.data),
    });
  };

  const handleSubmitOptions = async () => {
    const user = 'username'; // Replace with actual username logic
    const filteredData = {}; // Replace with actual filtered data from Table 2

    try {
      const response = await fetch('/api/submitData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user, data: filteredData }),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      // Handle successful submission
      console.log('Data submitted successfully');
    } catch (error) {
      // Handle errors
      console.error('Error submitting data:', error);
    }
  };

  useEffect(() => {
    loadCsvData();
  }, []);

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const filteredData = csvData.filter((row) =>
    Object.entries(filters).every(([key, value]) => !value || row[key] === value)
  );

  useEffect(() => {
    // Assuming username is retrieved or set here
    const username = 'User'; // Replace 'User' with actual username logic

    // Show the popup on page load
    setShowPopup(true);

    // Hide the popup after a delay (e.g., 3 seconds)
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Determine the logo URL and header text based on the stack
  const logoUrl = stack === 'SAP' ? '/sap-logo.png' : '/nextjs-logo.png';
  const headerText = stack === 'SAP' ? 'SAP' : 'Next.js';

  return (
        <div className="container footer">
        <div className="container mx-auto p-4">
          <div className="flex items-center mb-4">
            <img src={logoUrl} alt={`${headerText} logo`} className="mr-2 w-12 h-12" />
            <h1 className="text-2xl font-bold">{headerText}</h1>
          </div>
          <div className="flex">
      {/* First Table */}
      <table>
        <thead>
          <tr>
            <th>Shop Around</th>
          </tr>
        </thead>
        <tbody>
          {['Page', 'Action', 'Module', 'Element'].map((item) => (
            <tr key={item}>
              <td>
                <select name={item} onChange={handleDropdownChange}>
                  <option value="">Select {item}</option>
                  {/* Add options here */}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Second Table */}
      <table>
        <thead>
          <tr>
            <th>Page</th>
            <th>Action</th>
            <th>Module</th>
            <th>Element</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index}>
              <td>{row.Page}</td>
              <td>{row.Action}</td>
              <td>{row.Module}</td>
              <td>{row.Element}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer onSubmitOptions={handleSubmitOptions} />
    </div>
    </div>
    </div>
  )}};

export default StackPage;