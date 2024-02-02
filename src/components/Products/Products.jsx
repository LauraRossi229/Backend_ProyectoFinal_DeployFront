import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import ProductCard from "../ProductCard/ProductCard";

const Products = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://proyectofinal-backend-deploy-laurarossi.onrender.com/api/products");
        if (response.ok) {
          const data = await response.json();
          setProductos(data.docs);
        } else {
          console.error("Error al obtener productos");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container">
      <Row>
      {console.log(productos)}
        {productos.map((producto) => (
          <ProductCard key={producto._id} {...producto} />
        ))}
      </Row>
      {/* ... (puedes agregar más contenido según sea necesario) */}
    </div>
  );
};

export default Products;
