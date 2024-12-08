import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const GameCard = ({ game }) => {
  const { dispatch, openSidebar } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    // Añadir al carrito
    dispatch({ type: "ADD_TO_CART", payload: game });
    // Abrir el sidebar
    openSidebar();
  };

  const handleNavigate = () => {
    navigate(`/games/${game.id}`);
  };

  return (
    <div className="flex-shrink-0 m-6 relative overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg max-w-xs shadow-lg transition-transform transform hover:scale-105">
      <div className="relative pt-10 px-10 flex items-center justify-center">
        <img className="relative w-40" src={game.imguno} alt={game.nombre} />
      </div>
      <div className="relative text-white px-6 pb-6 mt-6">
        <span className="block opacity-75 -mb-1">{game.consola}</span>
        <div className="flex justify-between items-center">
          <span className="block font-semibold text-xl">{game.nombre}</span>
          <span className="block bg-white rounded-full text-indigo-500 text-xs font-bold px-3 py-2 leading-none flex items-center">
            ${game.precio}
          </span>
        </div>
      </div>
      <div className="flex gap-2 px-6 pb-4">
        <button
          onClick={handleAddToCart}
          className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 transform hover:scale-105"
        >
          Añadir al Carrito
        </button>
        <button
          onClick={handleNavigate}
          className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 transform hover:scale-105"
        >
          Ver Más
        </button>
      </div>
    </div>
  );
};

export default GameCard;
