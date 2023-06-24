import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(localStorage.getItem('userData'));

  const handleLogout = () => {
    // Realizar el logout y actualizar el estado
    // ...

    setUserData(null);
    localStorage.removeItem('userData');
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
