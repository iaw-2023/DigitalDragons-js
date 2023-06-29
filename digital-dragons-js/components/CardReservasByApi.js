import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import jwt_decode from 'jsonwebtoken';


const CardReservasByApi = ({ userId }) => {
  const [reservas, setReservas] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const reservationsPerPage = 5;
  const pagesVisited = pageNumber * reservationsPerPage;
  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await axios.get(`https://digital-dragons-laravel-2rwz5slqh-digitaldragons.vercel.app/rest/reservas`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const allReservas = response.data;

        // Filtrar las reservas por el cliente asociado al token
        const filteredReservas = allReservas.filter(
          (reserva) => reserva.cliente_id === getClienteIdFromToken(accessToken)
        );

        /*const updatedReservas = [];

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
        */
        setReservas(filteredReservas);
      } catch (error) {
        console.error('Error al obtener las reservas:', error);
      }
    };

    fetchReservas();
  }, [accessToken]);

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

  // Función para obtener el ID del cliente desde el token
  const getClienteIdFromToken = (token) => {
    // Decodificar y extraer la información del token si es necesario
    // Puedes utilizar librerías como jsonwebtoken para decodificar el token

    try {
      const decodedToken = jwt_decode(token);
      const clienteId = decodedToken.clienteId;
      return clienteId;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      // Manejar el error adecuadamente, como devolver un valor predeterminado o mostrar un mensaje de error
      return null;
    }
  };

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
