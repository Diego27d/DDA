import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, isSidebarOpen, closeSidebar, dispatch } = useCart();
  const navigate = useNavigate();

  if (!isSidebarOpen) return null;

  const handleCheckout = () => {
    closeSidebar();
    navigate("/checkout");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Fondo oscuro */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={closeSidebar}
      ></div>

      {/* Contenedor del sidebar */}
      <div className="relative w-80 bg-gradient-to-br from-blue-800 to-purple-800 h-full shadow-lg overflow-hidden flex flex-col transition-transform transform translate-x-0 text-white">
        {/* Encabezado */}
        <div className="flex justify-between items-center p-4 bg-blue-800 text-white shadow-md">
          <h2 className="text-lg font-bold">Carrito</h2>
          <button
            className="hover:text-red-500 transition-all"
            onClick={closeSidebar}
          >
            ❌
          </button>
        </div>

        {/* Contenido del carrito */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <p className="text-center text-white">El carrito está vacío.</p>
          ) : (
            <ul className="divide-y divide-white">
              {cart.map((game) => {
                const precio = parseFloat(game.precio) || 0;
                const cantidad = parseInt(game.cantidad) || 1;
                return (
                  <li key={game.id} className="flex items-center py-4">
                    <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-300">
                      <img
                        src={game.imguno}
                        alt={game.nombre}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium text-white">
                        {game.nombre}
                      </h3>
                      <p className="text-sm text-white">
                        Cantidad: {cantidad}
                      </p>
                      <p className="text-sm font-bold text-white">
                        ${precio * cantidad}
                      </p>
                    </div>

                    <button
                      className="text-red-500 hover:text-red-700 text-sm font-semibold transition-all"
                      onClick={() =>
                        dispatch({ type: "REMOVE_FROM_CART", payload: game.id })
                      }
                    >
                      Eliminar
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-gray-300 p-4">
            <div className="flex justify-between text-lg font-medium text-white mb-4">
              <span>Total:</span>
              <span>
                $
                {cart.reduce((total, game) => {
                  const precio = parseFloat(game.precio) || 0;
                  const cantidad = parseInt(game.cantidad) || 1;
                  return total + precio * cantidad;
                }, 0)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-green-600 to-green-800 text-white py-2 px-4 rounded-md shadow-md hover:from-green-700 hover:to-green-900 transition-all font-semibold"
            >
              Pagar
            </button>
            <button
              onClick={closeSidebar}
              className="mt-2 w-full text-blue-800 bg-white py-2 px-4 rounded-md shadow-md hover:bg-gray-200 transition-all font-semibold"
            >
              Seguir Comprando
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
