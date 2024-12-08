import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();

  // Función para eliminar un elemento del carrito
  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  // Función para vaciar el carrito
  const handleEmptyCart = () => {
    dispatch({ type: "EMPTY_CART" });
  };

  // Función para proceder al pago
  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-800 to-purple-800 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Mi Carrito</h1>
      <div className="flex justify-center">
        <div className="bg-gradient-to-br from-blue-900 to-purple-900 shadow-md rounded-md p-6 w-2/3">
          {cart.length === 0 ? (
            <p className="text-center text-white">El carrito está vacío.</p>
          ) : (
            <>
              <div className="mb-4">
                {cart.map((game) => {
                  const precio = parseFloat(game.precio) || 0;
                  const cantidad = parseInt(game.cantidad) || 1;
                  return (
                    <div
                      key={game.id}
                      className="flex items-center justify-between mb-4 p-4 border-b border-white"
                    >
                      <div className="flex items-center">
                        <img
                          src={game.imguno}
                          alt={game.nombre}
                          className="h-24 w-24 object-cover rounded-md border border-gray-300"
                        />
                        <div className="ml-4">
                          <h2 className="text-xl font-semibold">{game.nombre}</h2>
                          <p className="text-gray-300">{game.version}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            dispatch({ type: "DECREASE_QUANTITY", payload: game.id })
                          }
                          className="text-gray-300 px-2 hover:text-white transition-all"
                        >
                          -
                        </button>
                        <span className="px-2">{cantidad}</span>
                        <button
                          onClick={() =>
                            dispatch({ type: "INCREASE_QUANTITY", payload: game.id })
                          }
                          className="text-gray-300 px-2 hover:text-white transition-all"
                        >
                          +
                        </button>
                        <p className="ml-6 font-medium">
                          ${(precio * cantidad).toFixed(2)}
                        </p>
                        <button
                          onClick={() => handleRemove(game.id)}
                          className="ml-4 text-red-500 hover:text-red-700 transition-all"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between items-center border-t border-white pt-6">
                <h2 className="text-2xl font-bold">
                  Total: $
                  {cart.reduce((total, game) => {
                    const precio = parseFloat(game.precio) || 0;
                    const cantidad = parseInt(game.cantidad) || 1;
                    return total + precio * cantidad;
                  }, 0).toFixed(2)}
                </h2>
                <div className="flex gap-4">
                  <button
                    onClick={handleEmptyCart}
                    className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition-all font-semibold"
                  >
                    Vaciar Carrito
                  </button>
                  <button
                    onClick={handleCheckout}
                    className="bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700 transition-all font-semibold"
                  >
                    Pagar
                  </button>
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 rounded-md shadow-md hover:from-blue-700 hover:to-blue-900 transition-all font-semibold"
                  >
                    Seguir Comprando
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
