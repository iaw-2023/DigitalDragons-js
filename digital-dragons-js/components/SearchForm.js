// SearchForm.js
import React, { useState, useEffect } from 'react';
import CityList from './CityListByApi';
import FlightListByApi from './FlightListByApi.js';

const SearchForm = ({ setFlights }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const handleOriginChange = event => {
    setOrigin(event.target.value);
  };

  const handleDestinationChange = event => {
    setDestination(event.target.value);
  };

  useEffect(() => {
    // Llama a FlightListByApi desde aquí para obtener los vuelos
    const fetchFlightsData = async () => {
      await FlightListByApi({ setFlights });
    };

    fetchFlightsData();
  }, [setFlights]);

  const handleSubmit = event => {
    event.preventDefault();
    // Aquí puedes manejar la lógica para realizar la búsqueda de vuelos con las ciudades seleccionadas.
    // En lugar de la lógica de búsqueda, simplemente estableceré algunos vuelos de ejemplo aquí:
    const flights = [
      {
        id: 1,
        origin: origin,
        destination: destination,
        departureTime: '2023-10-10 12:00:00',
        arrivalTime: '2023-10-11 12:00:00',
        availableSeats: 100,
        price: 50000,
        airline: 'Aerolinea Ejemplo',
      },
      {
        id: 2,
        origin: origin,
        destination: destination,
        departureTime: '2023-10-10 12:00:00',
        arrivalTime: '2023-10-11 12:00:00',
        availableSeats: 100,
        price: 50000,
        airline: 'Aerolinea Ejemplo',
      },
      // Agrega más objetos de vuelo según sea necesario
    ];
    //setFlights(FlightListByApi({ origin, destination }));
    setFlights(flights);
  };

  const [origins, destinations] = CityList();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <div className="flex page-container">
        <div className="mr-4">
          <label htmlFor="origin" className="text-lg font-medium mb-2 text-black">
            Ciudad de origen:
          </label>
          <select
            id="origin"
            value={origin}
            onChange={handleOriginChange}
            className="border text-gray-600 border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="">Selecciona una ciudad</option>
            {origins.map(city => (
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
            className="border text-gray-600 border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="">Selecciona una ciudad</option>
            {destinations.map(city => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mt-4"
      >
        Buscar vuelos
      </button>
    </form>
  );
};

export default SearchForm;
