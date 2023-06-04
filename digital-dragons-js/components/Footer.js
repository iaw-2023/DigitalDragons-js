import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-500 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm mb-2">
          Todos los derechos reservados &copy; {new Date().getFullYear()} Digital Dragons.
        </p>
        <p className="text-sm">
          Desarrollado por <span className="font-bold">Main Dragons</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;