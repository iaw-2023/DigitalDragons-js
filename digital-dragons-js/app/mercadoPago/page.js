"use client"
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useRouter } from 'next/navigation';



export default function MP() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const realizarReserva = async () => { 
    const reservationData = localStorage.getItem('reservationData');
    
    try {
      // Realizar la solicitud POST para registrar la reserva
      const response = await axios.post(
        'https://digital-dragons-laravel-2rwz5slqh-digitaldragons.vercel.app/rest/reservas',
        reservationData
      );
    } catch (error) {
      console.error('Error al registrar la reserva:', error);
    }
  }

  const router = useRouter();

  useEffect(() => {
    
    
    const loadMercadoPagoScript = () => {
      const script = document.createElement('script');
      script.src = 'https://sdk.mercadopago.com/js/v2';
      script.async = true;
      script.onload = initializeMercadoPago;
      document.body.appendChild(script);
    };

    //initMercadoPago('TEST-4aab04bf-a4fb-4724-881f-53f0ffc5a971');

    const initializeMercadoPago = () => {
      const mp = new window.MercadoPago('TEST-4aab04bf-a4fb-4724-881f-53f0ffc5a971', {
        locale: 'es'
      });

      const bricksBuilder = mp.bricks();

      
      
      const renderCardPaymentBrick = async (bricksBuilder) => {
        const reservationData = localStorage.getItem('reservationData');
        const precio = reservationData.data.precio;
        const settings = {
          initialization: {
            amount: precio, // monto a ser pago
            payer: {
              email: ''
            }
          },
          customization: {
            visual: {
              style: {
                theme: 'default' // | 'dark' | 'bootstrap' | 'flat'
              }
            }
          },
          callbacks: {
            onReady: () => {
              // callback llamado cuando Brick esté listo
            },
            
            onSubmit: (cardFormData) => {
              
              //  callback llamado cuando el usuario haga clic en el botón enviar los datos
              //  ejemplo de envío de los datos recolectados por el Brick a su servidor
              
              return new Promise((resolve, reject) => {
                fetch('https://digital-dragons-laravel-6bh4how1y-digitaldragons.vercel.app/rest/reservas', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(cardFormData)
                })
                .then((response) => response.json()) // Parsea la respuesta JSON
                .then((data) => {
                  setPaymentResponse(data); // Actualiza el estado con los datos de la respuesta
                  resolve();

                  let title = '';
                  let icon = '';

                  if (data.status == 'approved') {
                    title = 'Pago realizado con éxito';
                    icon = 'success';
                    realizarReserva();
                  } else if (data.status == 'in_process') {
                    title = 'Pago pendiente';
                    icon = 'warning';
                  } else if (data.status == 'rejected') {
                    title = 'Pago fallido';
                    icon = 'error';
                  } else {
                    title = 'Estado desconocido';
                    icon = 'question';
                  }

                  Swal.fire({
                    title: title,
                    html: `
                      ID de pago: ${data.id}
                      Estado: ${data.status}
                      Detalle de estado: ${data.status_detail}
                    `,
                    icon: icon,
                    confirmButtonText: 'Aceptar'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      //destroyPaymentBrickInstance();
                      //document.body.removeChild(script);
                      router.push('/');
                      
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                      // Lógica a realizar cuando se hace clic en el botón "Cancelar" o se cierra la alerta
                    }
                  });
                  

                })
                .catch((error) => {
                  reject();
                })
                .finally(() => {
                  //setIsSubmitting(false); // Finaliza el envío de los datos del formulario
                });
              });
            },
            onError: (error) => {
              // callback llamado para todos los casos de error de Brick
            }
          }
        };
        
        window.cardPaymentBrickController = bricksBuilder
          .create('cardPayment', 'cardPaymentBrick_container', settings)
          .catch((error) => {
            console.error('Error creating card payment brick:', error);
          });
      };

      renderCardPaymentBrick(bricksBuilder);
    };

    loadMercadoPagoScript();

    /*const destroyPaymentBrickInstance = () => {
      if (window.paymentBrickController) {
        window.paymentBrickController.unmount();
      }
    };

    return () => {
      //destroyPaymentBrickInstance();
      //document.body.removeChild(script);
    };*/
  }, [router]);

  const [paymentResponse, setPaymentResponse] = useState(null);


  return (

    <div>
        <div id="cardPaymentBrick_container"></div>
      
        {paymentResponse && (
          <div>
            
          </div>
          
        )}
    </div>

  );
}
