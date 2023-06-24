import React, { useState } from 'react';
import Swal from 'sweetalert2';

const LoginForm = () => {

  const handleLogin = () => {
    let username = document.querySelector('#username').value;
    let password = document.querySelector('#password').value;
    fetch(`https://digital-dragons-laravel.vercel.app/rest/clientes/${username}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.clave === password) {
          localStorage.setItem('userData', JSON.stringify(data));
          Swal.fire('Success', 'Login successful', 'success');
        } else {
          Swal.fire('Error', 'Invalid username or password', 'error');
        }
        
      });
  };

  const showLoginForm = () => {
    Swal.fire({
      title: 'Login',
      html: `
        <input type="text" id="username" class="swal2-input" placeholder="Username">
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
      href="#"
      className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
      onClick={showLoginForm}
    >
      Login
    </a>
  );
};

export default LoginForm;
