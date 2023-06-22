import mercadopago from 'mercadopago';


const mercadopago = require('mercadopago');

mercadopago.configure({
    access_token: 'TEST-1520019505773649-061615-f7bdf7850bfc17bc38ea790cc1e7ea39-1186541481',
  });
  


export async function processPayment(flightPrice, cardToken, email) {
  const payment = await mercadopago.createPayment({
    transaction_amount: flightPrice,
    description: 'Reserva de vuelo',
    payment_method_id: 'visa',
    token: cardToken,
    installments: 1,
    issuer_id: null,
    payer: {
      email: email,
    },
  });

  return payment;
}
