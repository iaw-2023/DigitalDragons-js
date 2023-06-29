"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardReservasByApi from '../../components/CardReservasByApi';

const ReservasPage = () => {
  const [clientId, setClientId] = useState('');

  useEffect(() => {
    const showReservas = async () => {
      const accessToken = localStorage.getItem('access_token');

      if (accessToken) {
        try {
          const response = await axios.get('https://digital-dragons-laravel-beo4kkxi2-digitaldragons.vercel.app/rest/cliente', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          setClientId(response.data.cliente.id);
        } catch (error) {
          console.error('Error fetching client data:', error);
        }
      }
    };

    showReservas();
  }, []);

  return (
    <div>
      <CardReservasByApi userId={clientId} />
    </div>
  );
};

export default ReservasPage;
