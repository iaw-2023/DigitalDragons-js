import React from 'react';

const FlightList = ({ flights }) => {
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
    <div className="page-container">
      {flights.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {flights.map((flight) => (
            <div
              key={flight.id}
              className="bg-blue-100 text-blue-500 shadow-md rounded-lg p-6 flex flex-col justify-between"
            >
              <h3 className="text-xl font-semibold mb-2">{flight.airline}</h3>
              <div>
                <span className="font-semibold">Origen: </span>
                {flight.origin}
              </div>
              <div>
                <span className="font-semibold">Destino: </span>
                {flight.destination}
              </div>
              <div>
                <span className="font-semibold">Días hasta la salida: </span>
                {getDaysUntilDeparture(flight.departureTime)}
              </div>
              <div>
                <span className="font-semibold">Duración del vuelo: </span>
                {getFlightDuration(flight.departureTime, flight.arrivalTime)}
              </div>
              <div>
                <span className="font-semibold">Asientos disponibles: </span>
                {flight.availableSeats}
              </div>
              <div>
                <span className="font-semibold">Precio: </span>
                {flight.price}
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
