// Purchase.jsx

import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LogContext } from '../LogContext';
import './Purchase.scss'; // Importa los estilos SCSS

const Purchase = () => {
  const { cartId } = useContext(LogContext);
  const [ticketInfo, setTicketInfo] = useState(null);

  useEffect(() => {
    const fetchTicketInfo = async () => {
      try {
        const response = await fetch(`https://proyectofinal-backend-deploy-laurarossi.onrender.com/api/carts/${cartId}/purchase`, {
          method: 'POST', // Ajusta el método según tu backend
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTicketInfo(data);
          console.log(data);
        } else {
          console.error('No se pudo obtener la información del ticket');
        }
      } catch (error) {
        console.error('Error al obtener la información del ticket:', error);
      }
    };

    fetchTicketInfo();
  }, [cartId]);

  return (
    <div className="purchase-details">
      <h2>Detalles de la Compra</h2>
      {ticketInfo ? (
        <>
          <p>Ticket ID: {ticketInfo.ticket}</p>
          <p>Total de la Compra: ${ticketInfo.amount}</p>
          <p>Correo del Comprador: {ticketInfo.purchaser}</p>
          <p>Su compra se realizó con éxito, se enviará el detalle al correo del comprador.</p>
        </>
      ) : (
        <p>Cargando detalles de la compra...</p>
      )}

      <div className="buttons-container">
        <button className="btn-primary">
          <Link to="/" className="link-style">
            Salir
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Purchase;


