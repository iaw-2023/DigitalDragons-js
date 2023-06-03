"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FlightPage = ({ params }) => {
  const { flightId } = params;
  const [selectedCategory, setSelectedCategory] = useState('');
  const [flightData, setFlightData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const[flightPrice,setFlightPrice]=useState(0);

  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        const response = await fetch(
          `https://digital-dragons-laravel-2rwz5slqh-digitaldragons.vercel.app/rest/vuelos/${flightId}`
        );
        const data = await response.json();
        setFlightData(data);
      } catch (error) {
        console.error('Error fetching flight data:', error);
      }
    };

    fetchFlightData();
  }, [flightId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Obtener los datos del formulario
    const { name, email } = formData;

    // Crear el objeto de reserva
    var flightPrice = flightData.precio * 2.1;
    if(selectedCategory == "Economica"){
      var flightPrice = flightData.precio;
    }
    if(selectedCategory == "Premium Economy"){
      var flightPrice = flightData.precio * 1.3;
    }
    if(selectedCategory == "Business"){
      var flightPrice = flightData.precio * 1.7;
    }
    const reservationData = {
      categoria: selectedCategory,
      numero_asiento: 1, // Completa con el número de asiento deseado
      precio: flightPrice, // Utiliza el precio del vuelo obtenido
      vuelo_id: flightId,
      cliente_id: 1, // Completa con el ID del cliente
    };

    try {
      // Realizar la solicitud POST para registrar la reserva
      const response = await axios.post(
        'https://digital-dragons-laravel-2rwz5slqh-digitaldragons.vercel.app/rest/reservas',
        reservationData
      );

      console.log('Reserva registrada:', response.data);

      // Aquí puedes realizar cualquier acción adicional después de registrar la reserva

      // Reiniciar los datos del formulario
      setFormData({ name: '', email: '' });
    } catch (error) {
      console.error('Error al registrar la reserva:', error);
    }
  };
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  if (!flightData) {
    return <div className="page-container bg-gray-100 h-screen" >
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          Cargando ...
      </h1>
      </div>;
  }else
  return (
    <div className="page-container bg-gray-100 h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="py-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight text-center">
            ¡Ya estás a un paso de {flightData.destino}!
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto text-center">
            Selecciona la categoría de vuelo perfecta y haz de tu viaje una experiencia inolvidable
          </p>
          <section className="landing-section center text-black mt-4">
            <h2 className="title__group"></h2>
            <table className="average-price-flights w-full border-collapse">
              <thead>
                <tr>
                  <th id="headerCategory" className="bg-gray-100 py-2 px-4">
                    <span className="sr-only">Categoría de pasaje</span>
                  </th>
                  <th id="category_0" className="bg-gray-100 py-2 ">
                    Económica
                  </th>
                  <th id="category_1" className="bg-gray-100 py-2 px-4">
                    Premium Economy
                  </th>
                  <th id="category_2" className="bg-gray-100 py-2 px-4">
                    Business
                  </th>
                  <th id="category_3" className="bg-gray-100 py-2 px-4">
                    Primera clase
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr data-link="/t/barometro-tarifas/flight/economica" title="Ver el barómetro de tarifas de pasajes económicos">
                  <th headers="headerCategory" id="category_0" className="py-4 px-6">
                    Categorias Disponibles
                  </th>
                  <td headers="category_0 category_1" data-info="Economica" className="py-4 px-6">
                  {flightData.precio}$
                  </td>
                  <td headers="category_0 category_2" data-info="Premium Economy" className="py-4 px-6">
                    
                  {Math.floor(flightData.precio * 1.3)}$
                  </td>
                  <td headers="category_0 category_3" data-info="Business" className="py-4 px-6">
                  {Math.floor(flightData.precio * 1.7)}$
                  </td>
                  <td headers="category_0 category_3" data-info="Primera clase" className="py-4 px-6">
                  {Math.floor(flightData.precio * 2.1)}$
                  </td>
                </tr>
                <tr>
                  <th></th>
                  <td>
                    <button
                      className={`${
                        selectedCategory === 'Economica' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                      } ml-2 px-4 py-1 rounded`}
                      onClick={() => handleCategoryChange('Economica')}
                    >
                      {selectedCategory === 'Economica' ? 'Seleccionado' : 'Seleccionar'}
                    </button>
                  </td>
                  <td>
                    <button
                      className={`${
                        selectedCategory === 'Premium Economy' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                      } ml-2 px-4 py-1 rounded`}
                      onClick={() => handleCategoryChange('Premium Economy')}
                    >
                      {selectedCategory === 'Premium Economy' ? 'Seleccionado' : 'Seleccionar'}
                    </button>
                  </td>
                  <td>
                    <button
                      className={`${
                        selectedCategory === 'Business' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                      } ml-2 px-4 py-1 rounded`}
                      onClick={() => handleCategoryChange('Business')}
                    >
                      {selectedCategory === 'Business' ? 'Seleccionado' : 'Seleccionar'}
                    </button>
                  </td>
                  <td>
                    <button
                      className={`${
                        selectedCategory === 'Primera clase' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                      } ml-2 px-4 py-1 rounded`}
                      onClick={() => handleCategoryChange('Primera clase')}
                    >
                      {selectedCategory === 'Primera clase' ? 'Seleccionado' : 'Seleccionar'}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
          <div className="mt-10 flex justify-center text-black">
            <form className="w-80 bg-gray-200 p-4 rounded-lg" onSubmit={handleSubmit}>
            <label htmlFor="name" className="block mb-2">
                  <span className="font-semibold">Nombre:</span>
                  <input
                    type="text"
                    id="name"
                    className="mt-1 w-full p-2 border border-gray-300 rounded"
                    defaultValue="Mariano Gonzales"
                    disabled
                    required
                  />
                </label>
                <label htmlFor="email" className="block mb-2">
                  <span className="font-semibold">Email:</span>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 w-full p-2 border border-gray-300 rounded"
                    defaultValue="mg@gmail.com"
                    disabled
                    required
                  />
                </label>
              <button
                type="submit"
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightPage;
