import React from 'react';

interface GlobalErrorAlertProps {
  message: string;
}

export const GlobalErrorAlert: React.FC<GlobalErrorAlertProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default GlobalErrorAlert;
