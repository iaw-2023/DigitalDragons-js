import React, { useState } from 'react';
import CityList from './CityListByApi';

const SearchForm = ({ setCitys }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const handleOriginChange = (event) => {
    setOrigin(event.target.value);
  };

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCitys([origin, destination]);
  };

  const [origins, destinations] = CityList();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <div className="page-container">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="mb-4 md:mr-4">
            <label htmlFor="origin" className="text-lg font-medium mb-2 text-black">
              Ciudad de origen:
            </label>
            <select
              id="origin"
              value={origin}
              onChange={handleOriginChange}
              className="border text-gray-600 border-gray-300 rounded-lg px-4 py-2 w-full"
            >
              <option value="">Selecciona una ciudad</option>
              {origins.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="destination" className="text-lg font-medium mb-2 text-black">
              Ciudad de destino:
            </label>
            <select
              id="destination"
              value={destination}
              onChange={handleDestinationChange}
              className="border text-gray-600 border-gray-300 rounded-lg px-4 py-2 w-full"
            >
              <option value="">Selecciona una ciudad</option>
              {destinations.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mt-4 w-full"
        >
          Buscar vuelos
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
