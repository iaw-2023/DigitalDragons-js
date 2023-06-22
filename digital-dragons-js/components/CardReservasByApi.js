import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const CardReservasByApi = ({ userId }) => {
  const [reservas, setReservas] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const reservationsPerPage = 5;
  const pagesVisited = pageNumber * reservationsPerPage;

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await axios.get(`https://digital-dragons-laravel-2rwz5slqh-digitaldragons.vercel.app/rest/reservas`);
        const allReservas = response.data;

        // Filtrar las reservas por id del cliente
        const filteredReservas = allReservas.filter(
          (reserva) => reserva.cliente_id === userId
        );

        const updatedReservas = [];

        for (const reserva of filteredReservas) {
          try {
            const clienteResponse = await axios.get(`https://digital-dragons-laravel-2rwz5slqh-digitaldragons.vercel.app/rest/clientes/${reserva.cliente_id}`);
            const clienteData = clienteResponse.data;
            const updatedReserva = {
              ...reserva,
              cliente_id: clienteData.id
            };
            updatedReservas.push(updatedReserva);
          } catch (error) {
            console.error(`Error al obtener el cliente con ID ${reserva.cliente_id}`, error);
          }
        }

        // Actualizar las reservas con datos adicionales
        const updatedReservasDatosAdicionales = await Promise.all(
          filteredReservas.map(async (reserva) => {
            const vueloResponse = await axios.get(`https://digital-dragons-laravel-2rwz5slqh-digitaldragons.vercel.app/rest/vuelos/${reserva.vuelo_id}`);
            const vueloData = vueloResponse.data;

            return {
              ...reserva,
              numeroAsiento: vueloData.numero_asiento,
              precio: vueloData.precio
            };
          })
        );

        setReservas(updatedReservasDatosAdicionales);
      } catch (error) {
        console.error('Error al obtener las reservas:', error);
      }
    };

    fetchReservas();
  }, [userId]);

  if (reservas.length === 0) {
    return <div>
      <h1>Cargando datos...</h1> 
      </div>;
  }

  const pageCount = Math.ceil(reservas.length / reservationsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayedReservas = reservas.slice(pagesVisited, pagesVisited + reservationsPerPage);

  return (
    <div className="page-container bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight text-center">
            Mis Reservas
          </h1>
          <div className="py-8">
            {displayedReservas.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {displayedReservas.map((reserva) => (
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
                        //onClick={() => handleShowFlightDetails(reserva)} // Llama a la función handleShowFlightDetails pasando la reserva como argumento
                        //className="px-4 py-2 text-base font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
                        //Ver Datos del Vuelo
                      >
                        
                      </button>
                    </div>
                  </div>
                ))}
                <div className="mt-4">
                  <ReactPaginate
                    previousLabel={'Anterior'}
                    nextLabel={'Siguiente'}
                    breakLabel={'...'}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={'pagination flex justify-center'}
                    previousLinkClassName={'pagination-link bg-blue-500 text-white px-4 py-2 rounded-l'}
                    nextLinkClassName={'pagination-link bg-blue-500 text-white px-4 py-2 rounded-r'}
                    disabledClassName={'pagination-disabled'}
                    activeClassName={'pagination-active'}
                    pageClassName={'pagination-item'}
                    pageLinkClassName={'pagination-link bg-white text-blue-500 px-4 py-2'}
                  />
                </div>
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
