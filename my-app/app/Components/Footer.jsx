import React from 'react';

const Footer = () => {
  const getCurrentDate = () => {
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return currentDate.toLocaleDateString('en-US', options);
  };

  return (
    <footer className="bg-blue-500 p-4 mt-8 text-2xl text-white text-center font-bold">
      <div className="container mx-auto text-center">
        <p>New Generation High School Admin Portal {getCurrentDate()}</p>
      </div>
    </footer>
  );
};

export default Footer;
