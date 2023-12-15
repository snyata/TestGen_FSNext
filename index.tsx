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
    }, 3000); // Starts fading after 3 seconds

    return () => clearTimeout(timer);
  }, []);
  
    const handleSubmitOptions = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      router.push(`/stack/${stack}`);
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

    // Set cookie with user details
    Cookies.set('userDetails', JSON.stringify({ username, stack }), { expires: 7 }); // expires in 7 days

    // Navigate or perform further actions
    console.log('Form submitted');
  
  

  
    // Validate username and password
    const response = await fetch('/api/validateUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (data.valid) {
      // Navigate to the dynamic page with the selected stack
      router.push(`/stack/${stack}?username=${username}`);
    } else {
      // Handle invalid credentials
      console.error(data.message);
    }

  return(  
    <div className="container flex flex-col items-center justify-center h-screen">
    <Popup
        show={showPopup}
        imageUrl="./placeholder.gf"
      />
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
        <div>
        <Footer onSubmitOptions={handleSubmitOptions} />
        </div>
    </div>
  )};

export default Home;
