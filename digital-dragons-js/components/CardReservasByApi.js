import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CardReservasByApi = () => {
  

  /*const reservations = [
    { id: 1, category: 'Economy', seatNumber: '12', price: 150, flight: '123' },
    { id: 2, category: 'Business', seatNumber: '7', price: 300, flight: '456' },
    { id: 3, category: 'First Class', seatNumber: '3', price: 500, flight: '789' },
  ];*/

  const handleShowSearchForm = () => {
    setShowSearchForm(true);//???
    
  };

  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await axios.get('https://digital-dragons-laravel-2rwz5slqh-digitaldragons.vercel.app/rest/reservas');
        const allReservas = response.data;

        // Actualizar las reservas con datos adicionales
        const updatedReservas = await Promise.all(
          allReservas.map(async (reserva) => {
            const vueloResponse = await axios.get(`https://digital-dragons-laravel-2rwz5slqh-digitaldragons.vercel.app/rest/vuelos/${reserva.vuelo_id}`);
            const vueloData = vueloResponse.data;

            return {
              ...reserva,
              categoria: vueloData.categoria,
              numeroAsiento: vueloData.numero_asiento,
              precio: vueloData.precio
            };
          })
        );

        setReservas(updatedReservas);
      } catch (error) {
        console.error('Error al obtener las reservas:', error);
      }
    };

    fetchReservas();
  }, []);

  if (reservas.length === 0) {
    return <div>Cargando datos...</div>;
  }

  /*useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('https://digital-dragons-laravel-2rwz5slqh-digitaldragons.vercel.app/rest/reservas');
        const allReservations = response.data;

        // Filtrar los vuelos por ciudad de origen y destino
        const filteredReservations = allReservations.filter(
          (reservation) => reservation.id
        );

        const updatedReservations = [];

        for (const reservation of filteredReservations) {
          try {
            const categoriaResponse = await axios.get(`https://digital-dragons-laravel-2rwz5slqh-digitaldragons.vercel.app/rest/reservas/${reservation.id}`);
            const categoriaData = categoriaResponse.data;
            const updatedFlight = {
              ...flight,
              aerolinea_nombre: aerolineaData.nombre
            };
            updatedFlights.push(updatedFlight);
          } catch (error) {
            console.error(`Error al obtener la aerolínea con ID ${flight.aerolinea_id}`, error);
          }
        }*/

        //setFlights(updatedFlights);*/
      


  


  return (
   

    <div className="page-container bg-gray-100 h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="py-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight text-center">
            Mis Reservas
            </h1>
          <div className="py-8">
          {reservas.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {reservas.map((reserva) => (
                <div key={reserva.id} className="bg-blue-100 text-blue-500 shadow-md rounded-lg p-6 flex flex-col justify-between">
                  <h3 className="text-xl font-semibold mb-2">Reserva Nº {reserva.id}</h3>
                  
                  <div>
                  <span className="font-semibold">Categoria: </span>
                  {reserva.categoria}
                  </div>
                  <div>
                    <span className="font-semibold">Numero de Asiento: </span>
                    {reserva.numero_asiento}
                  </div>
                  <div>
                    <span className="font-semibold">Precio: </span>
                    {reserva.precio}
                  </div>
                  
                  <div className="flex items-center">
                    <div className="mr-auto">
                      <span className="font-semibold">Vuelo: </span>
                      {reserva.vuelo_id}
                    </div>
                    <button
                      onClick={handleShowSearchForm}
                      className="px-4 py-2 text-base font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
                    >
                      Ver Datos del Vuelo
                    </button>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <p>No se encontraron reservas disponibles.</p>
          )}
        </div>
      </div>
    </div>

    </div>
  );
};
export default CardReservasByApi;