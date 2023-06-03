"use client"
import { useState } from 'react';

const FlightPage = ({ params }) => {
  const { flightId } = params;
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para procesar los datos del formulario
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-black page-container">
      <h1 className="text-3xl font-bold mb-8">De Origen del vuelo a Destino del vuelo</h1>
      <div className="bg-gray-200 p-4 rounded-lg mb-8">
        <p className="mb-2">
          <span className="font-semibold">Categorías disponibles:</span>
        </p>
        <ul className="list-disc ml-4">
          <li>
            <label htmlFor="category1" className="flex items-center">
              <input
                type="radio"
                id="category1"
                name="category"
                value="Categoría 1"
                onChange={(e) => setSelectedCategory(e.target.value)}
                checked={selectedCategory === 'Categoría 1'}
                className="mr-2"
              />
              Categoría 1
            </label>
          </li>
          <li>
            <label htmlFor="category2" className="flex items-center">
              <input
                type="radio"
                id="category2"
                name="category"
                value="Categoría 2"
                onChange={(e) => setSelectedCategory(e.target.value)}
                checked={selectedCategory === 'Categoría 2'}
                className="mr-2"
              />
              Categoría 2
            </label>
          </li>
          <li>
            <label htmlFor="category3" className="flex items-center">
              <input
                type="radio"
                id="category3"
                name="category"
                value="Categoría 3"
                onChange={(e) => setSelectedCategory(e.target.value)}
                checked={selectedCategory === 'Categoría 3'}
                className="mr-2"
              />
              Categoría 3
            </label>
          </li>
        </ul>
      </div>
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
  );
};

export default FlightPage;
