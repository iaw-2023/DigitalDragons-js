"use client"
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';





export default function MP() {
  const [isSubmitting, setIsSubmitting] = useState(false);
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
        const settings = {
          initialization: {
            amount: 100, // monto a ser pago
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
              setIsSubmitting(true); // Inicia el envío de los datos del formulario
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
                  });
                  setIsSubmitting(false);

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

    const destroyPaymentBrickInstance = () => {
      if (window.paymentBrickController) {
        window.paymentBrickController.unmount();
      }
    };

    return () => {
      destroyPaymentBrickInstance();
      document.body.removeChild(script);
    };
  }, []);

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
