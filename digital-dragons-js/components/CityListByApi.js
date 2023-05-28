import React, { useEffect, useState } from 'react';

function CityListByApi() {
  const [origins, setOrigins] = useState([]);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://digital-dragons-laravel-2rwz5slqh-digitaldragons.vercel.app/rest/vuelos');
      const data = await response.json();

      // Extraer todas las ciudades sin repetición utilizando un Set
      const uniqueOrigins = Array.from(new Set(data.map(item => item.origen)));
      const uniqueDestinations = Array.from(new Set(data.map(item => item.destino)));

      setOrigins(uniqueOrigins);
      setDestinations(uniqueDestinations);
    }

    fetchData();
  }, []);

  return [origins, destinations];
}

export default CityListByApi;
