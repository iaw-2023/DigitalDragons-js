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
        const filteredFlights = allFlights.filter(flight => flight.origin === origin && flight.destination === destination);

        setFlights(filteredFlights);
      } catch (error) {
        console.error('Error al obtener los vuelos:', error);
      }
    };

    fetchFlights();
  }, [origin, destination]);

  return flights;
};

export default FlightListByApi;
