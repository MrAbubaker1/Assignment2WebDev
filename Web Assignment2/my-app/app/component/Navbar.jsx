'use client'

import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 w-full fixed top-0 left-0 z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <img src="/images/logo.jpg" alt="School Logo" width="40px" height="40px" className='ml-auto' />
          <h1 className="text-4xl font-bold text-white">New Generation High School</h1>
        </div>
        <div className='flext items-center'>
          <a href="#" className="text-white hover:text-gray-300">Home</a>
          <a href="#" className="text-white hover:text-gray-300 ml-4">Add Student</a>
          <a href="#" className="text-white hover:text-gray-300 ml-4">View Student List</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
