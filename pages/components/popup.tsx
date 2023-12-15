// components/Popup.tsx
import React from 'react';
import styles from './Popup.module.css'; // Assuming you're using CSS modules

interface PopupProps {
  show: boolean;
  imageUrl: string;
}

const Popup: React.FC<PopupProps> = ({ show, imageUrl }) => {
  return (
    <div className={`${styles.popup} ${!show && styles.hide}`}>
      <img src={imageUrl} alt="Loading" />
    </div>
  );
};

export default Popup;
