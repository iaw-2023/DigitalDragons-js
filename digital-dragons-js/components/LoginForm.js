import React, { useState } from 'react';
import Swal from 'sweetalert2';

const LoginForm = () => {
  const handleLogin = () => {
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;

    // Realizar la solicitud de login a la API
    fetch('https://digital-dragons-laravel-git-correciones-y-58fd17-digitaldragons.vercel.app/rest/clientLogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        clave: password,
      }),
    })
      .then(response => response.json())
      .then(data => {
        // Manejar la respuesta de la API
        if (data.message === 'Login successful') {

          // El login fue exitoso
          let accessToken = data.access_token;
          localStorage.setItem('access_token', accessToken);


          window.location.reload();
        } else {
          Swal.fire('Login fallido', 'Mail o contraseña incorrectos', 'fail');
          let errorMessage = data.message;
          // Mostrar mensaje de error al usuario, etc.
        }
      })
      .catch(error => {
        // Manejar errores de conexión o cualquier otro error
        console.error('Error:', error);
      });
  };

  const showLoginForm = () => {
    Swal.fire({
      title: 'Login',
      html: `
        <input type="text" id="email" class="swal2-input" placeholder="email">
        <input type="password" id="password" class="swal2-input" placeholder="Password">
      `,
      confirmButtonText: 'Login',
      preConfirm: () => {
        handleLogin();
      },
    });
  };

  return (
    <a
      className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
      onClick={showLoginForm}
    >
      Acceder
    </a>
  );
};

export default LoginForm;
