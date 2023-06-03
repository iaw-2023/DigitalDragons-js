"use client"
import React, { useState } from 'react';

const FlightPage = ({ params }) => {
  const { flightId } = params;
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para procesar los datos del formulario
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    alert(category);
  };

  return (
    <div className="page-container bg-gray-100 h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="py-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight text-center">
            ¡Ya estás a un paso cerca de destino!
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto text-center">
            Algun subtitulo
          </p>
          <section className="landing-section center text-black mt-4">
            <h2 className="title__group"></h2>
            <table className="average-price-flights w-full border-collapse">
              <thead>
                <tr>
                  <th id="headerCategory" className="bg-gray-100 py-2 px-4">
                    <span className="sr-only">Categoría de pasaje</span>
                  </th>
                  <th id="category_0" className="bg-gray-100 py-2 ">
                    Económica
                  </th>
                  <th id="category_1" className="bg-gray-100 py-2 px-4">
                    Premium Economy
                  </th>
                  <th id="category_2" className="bg-gray-100 py-2 px-4">
                    Business
                  </th>
                  <th id="category_3" className="bg-gray-100 py-2 px-4">
                    Primera clase
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr data-link="/t/barometro-tarifas/flight/economica" title="Ver el barómetro de tarifas de pasajes económicos">
                  <th headers="headerCategory" id="category_0" className="py-4 px-6">
                    Categorias Disponibles
                  </th>
                  <td headers="category_0 category_1" data-info="Economica" className="py-4 px-6">
                    250€
                  </td>
                  <td headers="category_0 category_2" data-info="Premium Economy" className="py-4 px-6">
                    500€
                  </td>
                  <td headers="category_0 category_3" data-info="Business" className="py-4 px-6">
                    800€
                  </td>
                  <td headers="category_0 category_3" data-info="Primera clase" className="py-4 px-6">
                    900€
                  </td>
                </tr>
                <tr>
                  <th></th>
                  <td>
                    <button
                      className={`${
                        selectedCategory === 'Economica' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                      } ml-2 px-4 py-1 rounded`}
                      onClick={() => handleCategoryChange('Economica')}
                    >
                      Seleccionar
                    </button>
                  </td>
                  <td>
                    <button
                      className={`${
                        selectedCategory === 'Premium Economy' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                      } ml-2 px-4 py-1 rounded`}
                      onClick={() => handleCategoryChange('Premium Economy')}
                    >
                      Seleccionar
                    </button>
                  </td>
                  <td>
                    <button
                      className={`${
                        selectedCategory === 'Business' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                      } ml-2 px-4 py-1 rounded`}
                      onClick={() => handleCategoryChange('Business')}
                    >
                      Seleccionar
                    </button>
                  </td>
                  <td>
                    <button
                      className={`${
                        selectedCategory === 'primera_clase' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                      } ml-2 px-4 py-1 rounded`}
                      onClick={() => handleCategoryChange('primera_clase')}
                    >
                      Seleccionar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
          <div className="mt-10 flex justify-center text-black">
            <form className="w-80 bg-gray-200 p-4 rounded-lg" onSubmit={handleSubmit}>
              <label htmlFor="name" className="block mb-2">
                <span className="font-semibold">Nombre:</span>
                <input
                  type="text"
                  id="name"
                  className="mt-1 w-full p-2 border border-gray-300 rounded"
                  required
                />
              </label>
              <label htmlFor="email" className="block mb-2">
                <span className="font-semibold">Email:</span>
                <input
                  type="email"
                  id="email"
                  className="mt-1 w-full p-2 border border-gray-300 rounded"
                  required
                />
              </label>
              <button
                type="submit"
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightPage;
