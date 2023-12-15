// components/Footer.tsx
import React from 'react';
import { useRouter } from 'next/router';

interface FooterProps {
  onSubmitOptions?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onSubmitOptions }) => {
  const router = useRouter();

  const handleClearTests = () => {
    // Clear state logic (if needed)
    router.push('/'); // Navigate back to home
  };

  return (
    <footer className="border-t py-4 mt-8">
      <div className="container mx-auto flex justify-between items-center">
        <p>Made by someone for some reason 🤗</p>
        <div>
          <button onClick={handleClearTests} className="mr-4">
            Clear Tests
          </button>
          <button onClick={onSubmitOptions}>
            Submit Options
          </button>
        </div>
      </div>
      <style jsx>{`
        footer {
          border-color: #ccc;
        }
        button {
          background-color: #0070f3;
          color: white;
          padding: 8px 15px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
