"use client"
import React, { useEffect, useState } from 'react';

export default function MP() {
  useEffect(() => {
    

    const loadMercadoPagoScript = () => {
      const script = document.createElement('script');
      script.src = 'https://sdk.mercadopago.com/js/v2';
      script.async = true;
      script.onload = initializeMercadoPago;
      document.body.appendChild(script);
    };

    

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
              //  callback llamado cuando el usuario haga clic en el botón enviar los datos
              //  ejemplo de envío de los datos recolectados por el Brick a su servidor
              return new Promise((resolve, reject) => {
                fetch('/process_payment', {
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
                })
                .catch((error) => {
                  reject();
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
  }, []);
  const [paymentResponse, setPaymentResponse] = useState(null);
  return (

    <div>
        <div id="cardPaymentBrick_container"></div>
      
        {paymentResponse && (
          <div>
            <h2>Pago realizado con éxito</h2>
            <p>ID de pago: {paymentResponse.id}</p>
            <p>Estado: {paymentResponse.status}</p>
            <p>Detalle de estado: {paymentResponse.status_detail}</p>
          </div>
        )}
    </div>

  );
}
