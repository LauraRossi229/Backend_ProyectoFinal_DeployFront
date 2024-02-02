import React, { useState, useEffect, useContext } from 'react';
import { LogContext } from '../LogContext';
import "./Admin.scss"

const Admin = () => {
  const { adminToken } = useContext(LogContext);
  const [users, setUsers] = useState([]);

    console.log (adminToken);
  const getUsers = async () => {
    try {
      const response = await fetch('https://proyectofinal-backend-deploy-laurarossi.onrender.com/api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`, // Incluye el token en el encabezado
        },
        credentials: 'include',
      });

      if (response.status === 401) {
        console.error('Unauthorized access');
        return [];
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getUsers();
      setUsers(usersData);
    };

    fetchUsers();
  }, [adminToken]);

  const handleDeleteInactiveUsers = async () => {
        console.log('Button clicked');
    const inactiveUsers = users.filter(user => {
      const lastConnectionTimestamp = new Date(user.lastConnection).getTime();
      const twoDaysAgoTimestamp = Date.now() - 2 * 24 * 60 * 60 * 1000;
      return lastConnectionTimestamp < twoDaysAgoTimestamp;
    });

    const deletePromises = inactiveUsers.map(user =>
        fetch(`https://proyectofinal-backend-deploy-laurarossi.onrender.com/api/users/`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${adminToken}`, // Incluye el token en el encabezado
            },
            credentials: 'include',
        })
      );

    try {
      await Promise.all(deletePromises);
      console.log('Usuarios eliminados con éxito.');
    } catch (error) {
      console.error('Error eliminando usuarios:', error);
    }

    const updatedUsers = await getUsers();
    setUsers(updatedUsers);
  };

  return (
    <div>
      <h1>Panel de Administrador</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>rol</th>
           
          </tr>
        </thead>
        <tbody>
  {users.map(user => {
    console.log('User:', user); // Log the user object to inspect the data
    return (
      <tr key={user.id}>
        <td>{user._id}</td>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>{user.email}</td>
        <td>{user.rol}</td>
      </tr>
    );
  })}
</tbody>
<div className="center-button-container">
  <button onClick={handleDeleteInactiveUsers}>
    
    Eliminar Usuarios Inactivos
  </button>
</div>
      </table>
     

    </div>
  );
};

export default Admin;
