"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardReservasByApi from '../../components/CardReservasByApi';



const reservasPage = async () => {
    // Aquí puedes realizar cualquier lógica adicional, como obtener las reservas del usuario desde una API
    
  /*const [reservas, setReservas] = useState([]);
  const [clienteId, setClienteId] = useState('');

  useEffect(() => {
    // Obtener el clienteId del cliente actual (puedes obtenerlo de donde sea que lo estés almacenando)
    const obtenerClienteId = async () => {
      try {
        const response = await axios.get('https://digital-dragons-laravel-2rwz5slqh-digitaldragons.vercel.app/rest/clientes/$1');
        const clienteData = response.data;
        const clienteId = clienteData.id; // Ajusta esto según la estructura de tu respuesta de cliente
        setClienteId(clienteId);
      } catch (error) {
        console.error('Error al obtener el cliente:', error);
      }
    };

    obtenerClienteId();
  }, []);

  useEffect(() => {
    // Obtener todas las reservas desde la API
    const obtenerReservas = async () => {
      try {
        const response = await axios.get('https://digital-dragons-laravel-2rwz5slqh-digitaldragons.vercel.app/rest/reservas');
        const reservasData = response.data;
        setReservas(reservasData);
      } catch (error) {
        console.error('Error al obtener las reservas:', error);
      }
    };

    obtenerReservas();
  }, []);*/
  //VER DE FILTRAR LOS CLIENTES COMO LAS AEROLINEAS EN FlightListByApi
  //const reservasCliente = reservas.filter(reserva => reserva.cliente_id === clienteId);
  
    
  return (
      <div>
        
          <CardReservasByApi userId={1} />
        
          
      
      
    </div>
    );
  };
  
  export default reservasPage;
  