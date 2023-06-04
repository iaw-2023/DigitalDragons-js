import React from 'react';



const CardReservas = () => {
  

const reservations = [
    { id: 1, category: 'Economy', seatNumber: '12', price: 150, flight: '123' },
    { id: 2, category: 'Business', seatNumber: '7', price: 300, flight: '456' },
    { id: 3, category: 'First Class', seatNumber: '3', price: 500, flight: '789' },
  ];

  const handleShowSearchForm = () => {
    setShowSearchForm(true);
    
  };
  
  return (
    
 
    
    /*<div>
      hola
      {reservations.map((reservation) => (
        <div className="grid grid-cols-1 gap-4">
          <div
              
              className="bg-blue-100 text-blue-500 shadow-md rounded-lg p-6 flex flex-col justify-between"
            >
          {reservation.category}

        </div></div>
      ))}
    </div>*/

    <div className="page-container bg-gray-100 h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="py-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight text-center">
            Mis Reservas
            </h1>
          <div className="py-8">
          {reservations.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {reservations.map((reservation) => (
                <div key={reservation.id} className="bg-blue-100 text-blue-500 shadow-md rounded-lg p-6 flex flex-col justify-between">
                  <h3 className="text-xl font-semibold mb-2">Reserva Nº {reservation.id}</h3>
                  
                  <div>
                  <span className="font-semibold">Categoria: </span>
                  {reservation.category}
                  </div>
                  <div>
                    <span className="font-semibold">Numero de Asiento: </span>
                    {reservation.seatNumber}
                  </div>
                  <div>
                    <span className="font-semibold">Precio: </span>
                    {reservation.price}
                  </div>
                  
                  <div className="flex items-center">
                    <div className="mr-4">
                      <span className="font-semibold">Vuelo: </span>
                      {reservation.flight}
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
export default CardReservas;