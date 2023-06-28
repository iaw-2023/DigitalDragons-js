"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

//import Checkout from '../../../components/Checkout';
//import FlightPageContent from '../../../components/FlightPageContent';



const FlightPage = ({ params }) => {
  //const navigate = useNavigate();
  const router = useRouter();
  const handlePaymentButtonClick = () => {
    router.push('/mercadoPago'); // Ruta a la página de pago
  };
  const { flightId } = params;
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [flightData, setFlightData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
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
      } catch (error) {
        console.error('Error fetching flight data:', error);
      }
    };

    /*const initMercadoPago = () => {
      const publicKey = 'TEST-4aab04bf-a4fb-4724-881f-53f0ffc5a971'; // Reemplaza con tu clave pública de sandbox
  
      Mercadopago.setPublishableKey(publicKey);
      Mercadopago.setPaymentConfiguration({
        sandbox: true
      });

      //const bricksBuilder = mp.bricks();
    }*/
  
    // Llamadas a Mercadopago
    //initMercadoPago();

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
      
      
      // Obtener los datos del formulario
      const { name, email } = formData;

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
      
      const reservationData = {
        categoria: selectedCategory,
        numero_asiento: flightData.asientos_disponibles, // Completa con el número de asiento deseado
        precio: flightPrice, 
        vuelo_id: flightId,
        cliente_id: 1, // Completa con el ID del cliente
      };

      /*function initMercadoPago() {
        const publicKey = 'TEST-4aab04bf-a4fb-4724-881f-53f0ffc5a971'; // Reemplaza con tu clave pública de sandbox
      
        Mercadopago.setPublishableKey(publicKey);
        Mercadopago.setPaymentConfiguration({
          sandbox: true
        });
      }*/
      
      /*function iniciarPagoConTarjeta() {
        // Crea el objeto de preferencia de pago con los detalles de la reserva y el precio
        const preference = {
          items: [
            {
              title: 'Reserva de vuelo',
              quantity: 1,
              currency_id: 'ARS',
              unit_price: parseFloat(flightPrice),
            },
          ],
        };
      
        // Crea un formulario de pago con el método de pago con tarjeta (Checkout Bricks - Card Payment Brick)
        Mercadopago.createToken({
          cardNumber: 'NUMERO_DE_TARJETA',
          cardExpirationMonth: 'MES_DE_EXPIRACION',
          cardExpirationYear: 'AÑO_DE_EXPIRACION',
          cardholderName: 'NOMBRE_DEL_TITULAR',
          cardholderIdentification: {
            type: 'DNI',
            number: 'NUMERO_DE_IDENTIFICACION',
          },
          cardCVV: 'CVV',
        }, (status, response) => {
          if (status === 200) {
            setCardToken(response.id);
    
            // Aquí puedes realizar la llamada a tu servidor para procesar el pago con el token obtenido
            // y realizar las acciones necesarias después de completar el pago exitosamente.
          } else {
            // Manejo de errores
          }
        });
      }*/
      

      try {
        // Realizar la solicitud POST para registrar la reserva
        const response = await axios.post(
          'https://digital-dragons-laravel-2rwz5slqh-digitaldragons.vercel.app/rest/reservas',
          reservationData
        );
        //const alertMessage = `Reserva registrada:
        //  Origen: ${flightData.origen}
        //  Destino: ${flightData.destino}
        //  Categoría: ${selectedCategory}
        //  Número de asiento: ${flightData.asientos_disponibles}
        //  Fecha de salida: ${flightData.fecha_salida}
        //  Precio: $${flightPrice}`;
          Swal.fire({
            title: 'Reserva registrada',
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
          
      } catch (error) {
        console.error('Error al registrar la reserva:', error);
      }
    }else{
      alert("Lamentamos informarle que se acaba de ocupar el ultimo asiento disponible para este vuelo :(")
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
        disabled={!selectedCategory}
        id="btnRealizarReserva"
        type="submit"
        className={`mt-4 ${selectedCategory ? 'border-2 border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500' : 'border-2 border-black'} font-bold py-2 px-4 rounded`}
      >
       {selectedCategory ? "Realizar Reserva" : "Seleccione una categoria "}
      </button>
            </form>
          </div>
          
          
        </div>
      </div>
      
    </div>
  );
};

export default FlightPage;
