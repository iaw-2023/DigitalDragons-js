"use client"
import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import LogoutConfirmation from './LogoutConfirmation';

const Navbar = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const parsedUserData = JSON.parse(userDataString);
      setUserData(parsedUserData);
    }
  }, []);

  return (
    <nav className="bg-blue-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-white font-semibold text-lg">
              <div className="flex items-center">
                <img src="https://i.ibb.co/ZMFDHw4/logo2.png" alt="Logo" className="h-12 w-auto" />
              </div>
            </a>
          </div>
          <div className="flex">
            <a href="/" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
              Inicio
            </a>
            <a href="/reservas" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
              Reservas
            </a>
            <a href="/aboutUs" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
              About Us
            </a>
            {userData ? (
    
                <LogoutConfirmation />
            ) : (
              <LoginForm />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
