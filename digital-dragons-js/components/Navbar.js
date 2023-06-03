import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-white font-semibold text-lg">
              Digital Travels
            </a>
          </div>
          <div className="flex">
            <a href="/" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
              Inicio
            </a>
            <a href="/reservas" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
              Reservas
            </a>
            <a href="#" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
              About Us
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;