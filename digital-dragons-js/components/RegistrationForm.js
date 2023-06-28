import React, { useState } from 'react';
import Swal from 'sweetalert2';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = () => {
    let username = document.querySelector('#username').value;
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    fetch('https://digital-dragons-laravel-git-correciones-y-58fd17-digitaldragons.vercel.app/rest/clientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: username,
        email: email,
        clave: password,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Cliente creado correctamente.') {
          Swal.fire('Registro exitoso', '¡Tu registro ha sido exitoso!', 'success');
        } else {
          if(data.error == 'Email ya registrado.')
            Swal.fire('Registro fallido', 'Email ya registrado.', 'fail');
        }
      })
      .catch(error => {
        alert("catch");
        console.error('Error:', error);
      });
  };

  const showRegistrationForm = () => {
    Swal.fire({
      title: 'Registro',
      html: `
        <input type="text" id="username" class="swal2-input" placeholder="username">
        <input type="text" id="email" class="swal2-input" placeholder="email">
        <input type="password" id="password" class="swal2-input" placeholder="Password">
      `,
      confirmButtonText: 'Registrarse',
      preConfirm: () => {
        handleRegistration();
      },
    });
  };

  return (
    <a
      className="text-white bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
      onClick={showRegistrationForm}
    >
      Registrarse
    </a>
  );
};

export default RegistrationForm;
