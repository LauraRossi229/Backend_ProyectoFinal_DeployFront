import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const login = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
    localStorage.setItem('token', tokenData); // Almacenar el token en el almacenamiento local
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token'); // Eliminar el token del almacenamiento local al cerrar sesión
  };

  // Lógica para manejar la expiración del token (ejemplo)
  useEffect(() => {
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    if (tokenExpiration && new Date(tokenExpiration) < new Date()) {
      // El token ha expirado, cerrar sesión
      logout();
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
