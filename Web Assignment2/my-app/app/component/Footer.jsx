'use client'

import React from 'react';

const Footer = () => {
  return (
    <footer className="text-center p-4 bg-gray-200 text-gray-800 w-full fixed inset-x-0 bottom-0">
      &copy; {new Date().getFullYear()} New Generation High School. All rights reserved.
    </footer>
  );
}

export default Footer;
