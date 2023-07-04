import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FlightListByApi = ({ origin, destination }) => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get('https://digital-dragons-laravel-2rwz5slqh-digitaldragons.vercel.app/rest/vuelos');
        const allFlights = response.data;

        // Filtrar los vuelos por ciudad de origen y destino
        const filteredFlights = allFlights.filter(
          (flight) => flight.origen === origin && flight.destino === destination && flight.asientos_disponibles > 0
        );

        const updatedFlights = [];

        for (const flight of filteredFlights) {
          try {
            const aerolineaResponse = await axios.get(`https://digital-dragons-laravel-2rwz5slqh-digitaldragons.vercel.app/rest/aerolineas/${flight.aerolinea_id}`);
            const aerolineaData = aerolineaResponse.data;
            const updatedFlight = {
              ...flight,
              aerolinea_nombre: aerolineaData.nombre
            };
            updatedFlights.push(updatedFlight);
          } catch (error) {
            console.error(`Error al obtener la aerolínea con ID ${flight.aerolinea_id}`, error);
          }
        }

        setFlights(updatedFlights);
      } catch (error) {
        console.error('Error al obtener los vuelos:', error);
      }
    };

    fetchFlights();
  }, [origin, destination]);
  const getCurrentDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getDaysUntilDeparture = (departureDate) => {
    const currentDate = new Date();
    const departure = new Date(departureDate);
    const timeDiff = departure.getTime() - currentDate.getTime();
    const daysUntilDeparture = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysUntilDeparture;
  };


  const getFlightDuration = (departureDate, arrivalDate) => {
    const departure = new Date(departureDate);
    const arrival = new Date(arrivalDate);
    const duration = Math.abs(arrival - departure);
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="page-container text-black">
      {flights.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {flights.map((flight) => (
            <div
              key={flight.id}
              className="bg-blue-100 text-blue-500 shadow-md rounded-lg p-6 flex flex-col justify-between"
            >
              <h3 className="text-xl font-semibold mb-2">{flight.aerolinea_nombre}</h3>
              <div>
                <span className="font-semibold">Días hasta la salida: </span>
                {getDaysUntilDeparture(flight.fecha_salida)}
              </div>
              <div>
                <span className="font-semibold">Duración del vuelo: </span>
                {getFlightDuration(flight.fecha_salida, flight.fecha_llegada)}
              </div>
              <div>
                <span className="font-semibold">Asientos Disponibles: </span>
                {flight.asientos_disponibles} 
              </div>
              <div>
                <span className="font-semibold">Desde: </span>
                ${flight.precio} 
              </div>
              <a
              href={`/flight/${flight.id}`}
              className="border-2 border-blue-500 rounded-lg px-4 py-2 mt-4 hover:bg-blue-500 hover:text-white text-center"
            >
              Realizar reserva
            </a>
            </div>
          ))}
        </div>
      ) : (
        <p>No se encontraron vuelos disponibles.</p>
      )}
    </div>
  );
};

export default FlightListByApi;