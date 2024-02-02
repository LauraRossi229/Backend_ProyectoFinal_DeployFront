import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.scss";
import { LogContext } from "../LogContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { cartId } = useContext(LogContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://proyectofinal-backend-deploy-laurarossi.onrender.com/api/products/${id}`);

        if (response.ok) {
          const data = await response.json();
          data.quantity = 1;
          setProduct(data);
        } else {
          console.error("Failed to fetch product details");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    try {
      // Consulta el carrito actual para verificar la existencia del producto
      const cartResponse = await fetch(`https://proyectofinal-backend-deploy-laurarossi.onrender.com/api/carts/${cartId}`);
      const cartData = await cartResponse.json();
      console.log("Cart Data:", cartData.mensaje.products); 

      let existingProduct;
      if (Array.isArray(cartData.mensaje.products) && cartData.mensaje.products.length > 0) {
        existingProduct = cartData.mensaje.products.find((product) => product.id_prod?._id === id);
      }
  
      console.log("Existing Product:", existingProduct);
  
      if (existingProduct !== undefined) {
        // Verifica si existingProduct no es undefined ni null
        console.log("Existing product cantidad:", existingProduct.quantity);
        console.log("Existing Product Details:", existingProduct?.id_prod);
        console.log("ID del Producto Buscado:", id);
  
        // Si el producto ya existe y tiene una cantidad definida, realiza una actualización (PUT)
        const updatedQuantity = existingProduct.quantity + 1;
        console.log("Updated Quantity:", updatedQuantity);
      
        // Actualiza el estado local del producto
        setProduct(prevProduct => ({ ...prevProduct, quantity: updatedQuantity }));
      
        // Realiza la actualización en el carrito
        await updateCartItemQuantity(cartId, id, updatedQuantity);
      } else {
        // Si el producto no existe o no tiene una cantidad definida, realiza una inserción (POST)
        await addProductToCart(cartId, id);
      
        // Actualiza el estado local del producto
        setProduct(prevProduct => ({ ...prevProduct, quantity: 1 }));
      }
      
  
  
      console.log("Product added to cart successfully");
      alert("Producto agregado al carrito correctamente");
      // Opcionalmente, puedes redirigir al usuario a la página del carrito o mostrar un mensaje de éxito.
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };
  

  // Función para actualizar la cantidad de un producto en el carrito
  const updateCartItemQuantity = async (cartId, productId, newQuantity) => {
    try {
      console.log (newQuantity,productId)
      const response = await fetch(`https://proyectofinal-backend-deploy-laurarossi.onrender.com/api/carts/${cartId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          
            "products": [
              {
                "id_prod": productId,
                "quantity": newQuantity
              },
        
            ]
          
        }),
      });

      if (!response.ok) {
        console.error("Failed to update cart item quantity");
      }
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
    }
  };

  // Función para agregar un nuevo producto al carrito
  const addProductToCart = async (cartId, productId) => {
    try {
      const response = await fetch(`https://proyectofinal-backend-deploy-laurarossi.onrender.com/api/carts/${cartId}/products/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: 1,
        }),
      });

      if (!response.ok) {
        console.error("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
   
  };

  return (
    <section className="productdetail">
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={product.thumbnails && product.thumbnails[0]}
              className="img-fluid rounded-start"
              alt={product.title}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text">Precio: ${product.price}</p>
              <p className="card-text">Stock: {product.stock}</p>
              <button className="CartBoton mx-auto" onClick={addToCart}>
                <span className="IconContainer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 576 512"
                    fill="rgb(17, 17, 17)"
                    className="cart"
                  >
                    {/* ... (your existing SVG path) ... */}
                  </svg>
                </span>
                <p className="texto">Add to Cart</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
