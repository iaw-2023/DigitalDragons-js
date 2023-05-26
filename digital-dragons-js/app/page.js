'use client'; 
import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';

export default function Home() {
  const [showSearchForm, setShowSearchForm] = useState(false);

  const handleShowSearchForm = () => {
    setShowSearchForm(true);
  };


    return (
      <div className="bg-gray-100 h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="py-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight text-center">
              ¡Reserva tus vuelos fácilmente!
            </h1>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto text-center">
              Bienvenido a nuestra plataforma de reserva de vuelos. Encuentra las mejores opciones de vuelos y reserva de forma rápida y sencilla.
            </p>
            <div className="mt-10 flex justify-center">
              {!showSearchForm ? (
                <button
                  onClick={handleShowSearchForm}
                  className="px-6 py-3 text-base font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
                >
                  Ver vuelos disponibles
                </button>
              ) : (
                <SearchForm />
              )}
            </div>
          </div>
        </div>
     </div>
    );
  };
  
  