import React from 'react';

interface WelcomePopupProps {
  username: string;
  show: boolean;
}

const WelcomePopup: React.FC<WelcomePopupProps> = ({ username, show }) => {
  if (!show) return null;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 shadow-lg p-4 rounded-lg">
      <div className="text-6xl text-center">😊</div>
      <p className="text-center text-lg mt-4">
        Hello {username} - happy test building!
      </p>
    </div>
  );
};

export default WelcomePopup;