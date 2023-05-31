import React from 'react';

const FlightList = ({ flights }) => {
  return (
    <div>
      <h2 className="text-2xl font-medium mb-4">Vuelos Disponibles:</h2>
      {flights.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {flights.map(flight => (
            <div
              key={flight.id}
              className="bg-blue-500 text-white shadow-md rounded-lg p-6 flex flex-col justify-between"
            >
              <div>
                <span className="font-semibold">Origen: </span>
                {flight.origin}
              </div>
              <div>
                <span className="font-semibold">Destino: </span>
                {flight.destination}
              </div>
              <div>
                <span className="font-semibold">Hora de salida: </span>
                {flight.departureTime}
              </div>
              <div>
                <span className="font-semibold">Hora de llegada: </span>
                {flight.arrivalTime}
              </div>
              <div>
                <span className="font-semibold">Asientos disponibles: </span>
                {flight.availableSeats}
              </div>
              <div>
                <span className="font-semibold">Precio: </span>
                {flight.price}
              </div>
              <div>
                <span className="font-semibold">Aerolínea: </span>
                {flight.airline}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No se encontraron vuelos disponibles.</p>
      )}
    </div>
  );
};

export default FlightList;
