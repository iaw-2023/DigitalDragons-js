"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const FlightPage = ({ params }) => {
  const router = useRouter();
  const handlePaymentButtonClick = () => {
    router.push('/mercadoPago'); // Ruta a la página de pago
  };
  const { flightId } = params;
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [flightData, setFlightData] = useState(null);

  const [imageUrl, setImageUrl] = useState(null);
  const[flightPrice,setFlightPrice]=useState(0);
  //const [showCardPaymentForm, setShowCardPaymentForm] = useState(false);

  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        const response = await fetch(
          `https://digital-dragons-laravel-2rwz5slqh-digitaldragons.vercel.app/rest/vuelos/${flightId}`
        );
        const data = await response.json();
        setFlightData(data);
        setImageUrl(getDestinationImage(data.destino));
        
      } catch (error) {
        console.error('Error fetching flight data:', error);
      }
    };
    
    const getDestinationImage = async (destinationName) => {
      try {
        const url = `https://api.pexels.com/v1/search?query=${destinationName}%20landscape&format&per_page=1&orientation=landscape&size=small`;
        const response = await axios.get(url, {
          headers: {
            Authorization: 'PxIfeMofPj3AFuBQWrCGa1yJLQX9q7bKwuL8BFmInPzJZCNHDoaHXtE7',
          },
        });
    
        if (response.data && response.data.photos && response.data.photos.length > 0) {
          const imageUrl = response.data.photos[0].src.medium;
    
          return imageUrl;
        } else {
          throw new Error('No se encontraron imágenes para el destino especificado.');
        }
      } catch (error) {
        console.error('Error al obtener la imagen del destino:', error);
        throw error;
      }
    };

    fetchFlightData();
  }, [flightId]);

  const handleSubmit = async (e) => { 
    e.preventDefault();
    if(flightData.asientos_disponibles > 0){ 
      try {
        const updatedFlightData = {
          ...flightData,
          asientos_disponibles: flightData.asientos_disponibles - 1
        };

        await axios.put(`https://digital-dragons-laravel-qq2pnhaij-digitaldragons.vercel.app/rest/vuelos/${flightId}`, updatedFlightData);

        setFlightData(updatedFlightData);
      } catch (error) {
        console.error('Error updating flight data:', error);
      }
      

      // Crear el objeto de reserva
      var flightPrice = flightData.precio * 2.1;
      if(selectedCategory == "Economica"){
        flightPrice = flightData.precio;
      }
      if(selectedCategory == "Premium Economy"){
        flightPrice = flightData.precio * 1.3;
      }
      if(selectedCategory == "Business"){
        flightPrice = flightData.precio * 1.7;
      }
      
      let clientId = '';
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        try {
          const response = await axios.get('https://digital-dragons-laravel-git-correciones-y-58fd17-digitaldragons.vercel.app/rest/cliente', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
  
          clientId = response.data.cliente.id;
          console.log(clientId);
        } catch (error) {
          console.error('Error fetching client data:', error);
        }
      }
  
      // Crear el objeto de reserva
      let reservationData = {
        categoria: selectedCategory,
        numero_asiento: flightData.asientos_disponibles, // Completa con el número de asiento deseado
        precio: flightPrice,
        vuelo_id: flightId,
        cliente_id: clientId, // Utilizamos el ID del cliente obtenido de la API
      };
      reservationData = JSON.stringify(reservationData);
      localStorage.setItem('reservationData', reservationData);
      
      


      // try {
      //   // Realizar la solicitud POST para registrar la reserva
      //   const response = await axios.post(
      //     'https://digital-dragons-laravel-2rwz5slqh-digitaldragons.vercel.app/rest/reservas',
      //     reservationData
      //   );
          Swal.fire({
            title: 'Datos de reserva',
            html: `
              Origen: ${flightData.origen}<br/>
              Destino: ${flightData.destino}<br/>
              Categoría: ${selectedCategory}<br/>
              Número de asiento: ${flightData.asientos_disponibles}<br/>
              Fecha de salida: ${flightData.fecha_salida}<br/>
              Precio: $${flightPrice}`,
            showCancelButton: true,
            confirmButtonText: 'Ir a pagar',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.isConfirmed) {
              router.push('/mercadoPago');
              
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              // Lógica a realizar cuando se hace clic en el botón "Cancelar" o se cierra la alerta
            }
          });
          
      // } catch (error) {
      //   console.error('Error al registrar la reserva:', error);
      // }
    }else{
      alert("Lamentamos informarle que se acaba de ocupar el ultimo asiento disponible para este vuelo :(")
    }
  };

  const handleCategoryChange = (category) => {
    let backgroundImageClass = imageUrl ? 'bg-cover bg-center h-full flex flex-col items-center justify-center with-background' : 'bg-cover bg-center h-full flex flex-col items-center justify-center';

    setSelectedCategory(category);
  };

  
  let backgroundImageClass = imageUrl ? 'bg-cover bg-center h-full flex flex-col items-center justify-center with-background' : 'bg-cover bg-center h-full flex flex-col items-center justify-center';

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
        <div >
        <div className={backgroundImageClass} style={{ backgroundImage: 'url(${imageUrl})' }}>
  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight text-center text-black border-3 p-4">
    ¡Ya estás a un paso de {flightData.destino}!
  </h1>
  <p className="mt-4 max-w-2xl text-xl text-black lg:mx-auto text-center border-3 p-4">
  ${imageUrl}
    Selecciona la categoría de vuelo perfecta y haz de tu viaje una experiencia inolvidable
  </p>
</div>


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
          <div className="mt-10 flex justify-center text-black"></div>
          <form className="text-black" onSubmit={handleSubmit}>

<button
  disabled={!selectedCategory || !localStorage.getItem('access_token')}

  id="btnRealizarReserva"
  type="submit"
  className={`mt-4 ${!(!selectedCategory || !localStorage.getItem('access_token')) ? 'border-2 border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500' : 'border-2 border-black'} font-bold py-2 px-4 rounded`}
>
{selectedCategory ? localStorage.getItem('access_token') ? "Realizar Reserva" : "Ingrese a su cuenta y seleccione una categoria" : "Ingrese a su cuenta y seleccione una categoria"}
</button>

</form>
</div>
        </div>
      </div>
  );
};

export default FlightPage;
