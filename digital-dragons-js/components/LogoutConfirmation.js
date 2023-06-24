import React from 'react';
import Swal from 'sweetalert2';

const LogoutConfirmation = ({ onLogout }) => {
  const handleLogout = () => {
    Swal.fire({
      title: 'Confirm Logout',
      text: 'Are you sure you want to log out?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('userData');
      }
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

export default LogoutConfirmation;
