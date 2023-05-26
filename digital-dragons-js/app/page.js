
  import React from 'react';

  export default function Home() {
    return (
      <div className="bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight text-center">
              ¡Reserva tus vuelos fácilmente!
            </h1>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto text-center">
              Bienvenido a nuestra plataforma de reserva de vuelos. Encuentra las mejores opciones de vuelos y reserva de forma rápida y sencilla.
            </p>
            <div className="mt-6 flex justify-center">
              <a
                href="#"
                className="px-6 py-3 text-base font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
              >
                Ver vuelos disponibles
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  