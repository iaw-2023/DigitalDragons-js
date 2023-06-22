import React, { useEffect } from 'react';

const Checkout = () => {
  /*useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.async = true;

    script.onload = () => {
      // Código para inicializar y configurar el SDK de Mercado Pago
      const mp = new window.MercadoPago('TEST-4aab04bf-a4fb-4724-881f-53f0ffc5a971', {
        locale: 'es',
      });
  */

      useEffect(() => {
        const loadMercadoPagoScript = async () => {
          return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://sdk.mercadopago.com/js/v2';
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
          });
        };
        
        const initializeMercadoPago = async () => {
          try {
            await loadMercadoPagoScript();
    
            const mp = new window.MercadoPago('TEST-4aab04bf-a4fb-4724-881f-53f0ffc5a971', {
              locale: 'es',
            });
    
            const renderCardPaymentBrick = async () => {
              const bricksBuilder = mp.bricks();
              const cardPaymentBrickContainer = document.getElementById('cardPaymentBrick_container');
    
              const settings = {
                initialization: {
                  amount: 100, // Monto a ser pagado
                  payer: {
                    email: '',
                  },
                },
                customization: {
                  visual: {
                    style: {
                      theme: 'default', // | 'dark' | 'bootstrap' | 'flat'
                    },
                  },
                },
                callbacks: {
                  onReady: () => {
                    // Callback llamado cuando Brick esté listo
                  },
                  onSubmit: (cardFormData) => {
                    // Callback llamado cuando el usuario hace clic en el botón enviar los datos
                    // Ejemplo de envío de los datos recolectados por el Brick a tu servidor
                    return new Promise((resolve, reject) => {
                      fetch('/process_payment', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(cardFormData),
                      })
                        .then((response) => {
                          // Recibir el resultado del pago
                          resolve();
                        })
                        .catch((error) => {
                          // Tratar respuesta de error al intentar crear el pago
                          reject();
                        });
                    });
                  },
                  onError: (error) => {
                    // Callback llamado para todos los casos de error de Brick
                  },
                },
              };
    
              window.cardPaymentBrickController = await bricksBuilder.create(
                'cardPayment',
                cardPaymentBrickContainer,
                settings
              );
            };
    
            renderCardPaymentBrick();
          } catch (error) {
            console.error('Error al cargar el script del SDK de Mercado Pago:', error);
          }
        };
    
        initializeMercadoPago();
      }, []);
    
      return <div id="cardPaymentBrick_container"></div>;
    };
    
    export default Checkout;
  
  /*  
      const renderCardPaymentBrick = async () => {
        const bricksBuilder = mp.bricks();
        const cardPaymentBrickContainer = document.getElementById('cardPaymentBrick_container');

        const settings = {
          initialization: {
            amount: 100, // Monto a ser pagado
            payer: {
              email: '',
            },
          },
          customization: {
            visual: {
              style: {
                theme: 'default', // | 'dark' | 'bootstrap' | 'flat'
              },
            },
          },
          callbacks: {
            onReady: () => {
              // Callback llamado cuando Brick esté listo
            },
            onSubmit: (cardFormData) => {
              // Callback llamado cuando el usuario hace clic en el botón enviar los datos
              // Ejemplo de envío de los datos recolectados por el Brick a tu servidor
              return new Promise((resolve, reject) => {
                fetch('/process_payment', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(cardFormData),
                })
                  .then((response) => {
                    // Recibir el resultado del pago
                    resolve();
                  })
                  .catch((error) => {
                    // Tratar respuesta de error al intentar crear el pago
                    reject();
                  });
              });
            },
            onError: (error) => {
              // Callback llamado para todos los casos de error de Brick
            },
          },
        };

        window.cardPaymentBrickController = await bricksBuilder.create(
          'cardPayment',
          cardPaymentBrickContainer,
          settings
        );
      };

      renderCardPaymentBrick();
    };

    document.body.appendChild(script);
    script.onload();
  }, []);

  return <div id="cardPaymentBrick_container"></div>;
};

export default Checkout;

  */










   