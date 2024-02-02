import React from 'react';

const MyComponent = ({ cartId, productId, handleEliminarProducto }) => {
  const handleDeleteProduct = async () => {
    console.log('Handle delete product clicked');
    console.log(cartId);  // Acceder a cartId
    console.log(productId);  // Acceder a productId

    try {
      const response = await fetch(`https://proyectofinal-backend-deploy-laurarossi.onrender.com/api/carts/${cartId}/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Puedes incluir otras cabeceras según sea necesario
        },
      });

      if (response.ok) {
        alert ( "producto eliminado")
        // Producto eliminado con éxito, puedes realizar alguna acción adicional si es necesario
        handleEliminarProducto(productId);
      } else {
        // Manejar el caso en el que la eliminación del producto no fue exitosa
        console.error('No se pudo eliminar el producto');
        alert ( "No se pudo eliminar el producto")
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  return (
    <button variant="danger" onClick={handleDeleteProduct}>
      Eliminar Producto
    </button>
  );
};

export default MyComponent;
