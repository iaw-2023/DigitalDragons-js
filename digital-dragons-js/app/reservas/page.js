"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardReservasByApi from '../../components/CardReservasByApi';



const reservasPage = async () => {
  let clientId = '';
  //useEffect(() => {
    //const showReservas = async () => {
    // Perform localStorage action
    const accessToken = localStorage.getItem('access_token');
  
    
        //const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
          try {
            const response = await axios.get('https://digital-dragons-laravel-beo4kkxi2-digitaldragons.vercel.app/rest/cliente', {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
    
            clientId = response.data.id;
          } catch (error) {
            console.error('Error fetching client data:', error);
          }
        }
      
      
  
  
  //getCliente();
  return (
      <div>
        
          <CardReservasByApi userId={clientId} />
 
    </div>
    );
  };
  
  export default reservasPage;
  