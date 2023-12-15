// pages/index.tsx
import React, { useState, useEffect } from 'react';
import FormFields from './FormFields';
import { useRouter } from 'next/router';
import Popup from '../components/Popup';
import Footer from '../components/Footer';
import Cookies from 'js-cookie';

const Home: React.FC = () => {
  const [showPopup, setShowPopup] = useState<boolean>(true);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [stack, setStack] = useState<string>('SAP');
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate username and password
    const response = await fetch('/api/validateUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    
    if (data.valid) {
      Cookies.set('userDetails', JSON.stringify({ username, stack }), { expires: 7 });
      router.push(`/stack/${stack}?username=${username}`);
    } else {
      console.error(data.message);
    }
  };

  const handleSubmitOptions = async () => {
    // Note: This should be updated to include the actual logic
    // for gathering data from Table 2
    const filteredData = {}; 

    try {
      const response = await fetch('/api/submitData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: username, data: filteredData }),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      console.log('Data submitted successfully');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (  
    <div className="container flex flex-col items-center justify-center h-screen">
      <Popup show={showPopup} imageUrl="./placeholder.gf" />
      <div className="header">
        <img src="/nextjs-logo.png" alt="Next.js logo" className="header-logo" />
        <h1 className="text-xl font-bold">pastaSauce</h1>
        <img src="/logo.png" alt="logo" className="max-w-xs mb-8" />
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <FormFields
          username={username}
          password={password}
          stack={stack}
          setUsername={setUsername}
          setPassword={setPassword}
          setStack={setStack}
        />
      </form>
      <Footer onSubmitOptions={handleSubmitOptions} />
    </div>
  );
};

export default Home;
