import React from 'react';

const LogoutButton = () => {
  const handleLogout = () => {
    // Obtener el token de acceso del almacenamiento local
    const accessToken = localStorage.getItem('access_token');

    // Realizar la solicitud de logout a la API
    fetch('https://digital-dragons-laravel-git-correciones-y-58fd17-digitaldragons.vercel.app/rest/clientLogout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Logout exitoso') {
          localStorage.removeItem('access_token');
          window.location.href = '/'; 

        } else {
          // Mostrar mensaje de error, etc.
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <button
      className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
