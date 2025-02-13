// components/CustomButton.js

import React from 'react';

const CustomButton = ({ label, onClick, style, disabled }:{
  label: string,
  onClick: () => void,
  style?: React.CSSProperties,
  disabled?: boolean,
}) => {
  const defaultStyle = {
    padding: '10px 20px',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const combinedStyle = { ...defaultStyle, ...style };

  return (
    <button style={combinedStyle} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default CustomButton;
