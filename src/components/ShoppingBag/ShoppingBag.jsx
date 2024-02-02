import React, { useEffect, useState, useContext } from "react";
import "./ShoppingBag.scss";
import { useParams } from "react-router-dom";
import { LogContext } from "../LogContext"; // Asegúrate de la ruta correcta a tu LogContext
import { Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MyComponent from "./MyComponent";


const ShoppingBag = () => {
  const [carrito, setCarrito] = useState({});
  const { cartId } = useContext(LogContext);

  useEffect(() => {
    fetch(`https://proyectofinal-backend-deploy-laurarossi.onrender.com/api/carts/${cartId}`)
      .then((response) => response.json())
      .then((data) => {
        setCarrito(data);
      })
      .catch((error) => {
        console.log("Fetch error:", error);
      });
  }, [cartId]);

  const handleCantidadChange = (productoId, cantidad) => {
    // Implementa la lógica para cambiar la cantidad del producto en el carrito
  };

  const handleEliminarProducto = (productoId) => {
    // Implementa la lógica para eliminar un producto del carrito
  };

  const handleAceptarCompra = () => {
    // Implementa la lógica para procesar la compra
  };

  return (
    <div className="shopping-bag-container">
      <h2>Carrito de Compras</h2>
      {carrito.mensaje && carrito.mensaje.products && carrito.mensaje.products.length > 0 ? (
        <ListGroup>
          {carrito.mensaje.products.map((producto, index) => (
            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
              <div className="product-info">
                <div className="product-image">
                  <img src={producto.id_prod.thumbnails[0]} alt={producto.id_prod.title} />
                </div>
                <div className="product-details">
                  <h4>{producto.id_prod.title}</h4>
                  <p>{producto.id_prod.description}</p>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="row">
                  <div className="col-md-6">
                    <p className="mr-4 mb-2">
                      Cantidad: 
                      <input
                        type="number"
                        value={producto.quantity}
                        onChange={(e) => handleCantidadChange(producto.id, e.target.value)}
                        className="form-control d-inline-block"
                      />
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="mb-0">Precio:</p>
                    <p className="mt-0">${producto.id_prod.price}</p>
                  </div>
                </div>

                {/* MyComponent se utiliza para manejar la lógica de eliminación del producto */}
                 {/* MyComponent se utiliza para manejar la lógica de eliminación del producto */}
                 <MyComponent
                  cartId={cartId}  // Pasando cartId como prop
                  productId={producto.id_prod._id}  // Pasando solo el id del producto como prop
                  handleEliminarProducto={handleEliminarProducto}
                />

              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p>El carrito está vacío.</p>
      )}

<div className="carrito-buttons mt-3">
        <Button variant="success" onClick={handleAceptarCompra}>
          <Link to="/purchase" style={{ color: 'white', textDecoration: 'none' }}>
            Aceptar Compra
          </Link>
        </Button>
        <Button variant="primary" as={Link} to="/products">Seguir Comprando</Button>
      </div>
    </div>
  );
};

export default ShoppingBag;