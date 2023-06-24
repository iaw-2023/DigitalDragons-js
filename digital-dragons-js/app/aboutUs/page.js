import React from 'react';
import Image from 'next/image';

const AboutUsPage = () => {
  return (
    <div className="page-container bg-gray-100 h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="py-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight text-center">
            Somos Dragon Travels
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto text-center">
            Somos una compañía dedicada a brindar experiencias de vuelo únicas y memorables.
            Nuestro objetivo es hacer que cada viaje sea especial para nuestros pasajeros.
          </p>
          <section className="landing-section center text-black mt-4">
            <h2 className="text-2xl font-bold mb-4">Main Dragons:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg shadow-lg p-4 flex items-center">
                <Image
                  src="https://i.ibb.co/kM8TT5V/Aldana-Daniela-Case.jpg"
                  alt="Foto de Aldana Daniela Casé"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Aldana Daniela Casé</h3>
                  <p>Director Ejecutivo</p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-4 flex items-center">
                <Image
                  src="https://i.ibb.co/028J5tv/Ger-nimo-Le-Lan-Toussaint-profile-image.jpg"
                  alt="Foto de Gerónimo Le Lan Toussaint"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Gerónimo Le Lan Toussaint</h3>
                  <p>Director de Desarrollo</p>
                  <p>Desarrollador Front-End</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
