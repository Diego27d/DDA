import React, { useState } from "react";

const SidebarFilter = () => {
  // Estado para el rango de precios
  const [price, setPrice] = useState(3000); // Valor inicial del precio

  const handlePriceChange = (event) => {
    setPrice(event.target.value); // Actualiza el estado con el valor del slider
  };

  return (
    <div className="flex flex-col bg-white p-4 rounded-lg shadow-md max-w-sm w-full lg:w-1/4">
      {/* Barra de búsqueda */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Buscar juego..."
          className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="absolute right-3 top-3 text-blue-500">
          <i className="fas fa-search"></i>
        </button>
      </div>

      {/* Filtros */}
      <h2 className="font-semibold text-lg text-gray-700 mb-4">Filtros</h2>

      {/* Filtro Precio */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Precio</label>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">${price.toLocaleString()}</span>
        </div>
        <input
          type="range"
          min="0"
          max="500"
          step="10"
          value={price}
          onChange={handlePriceChange}
          className="w-full h-2 bg-blue-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>$0</span>
          <span>$500,00</span>
        </div>
      </div>

      {/* Filtro Consola */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Consola</label>
        <div className="flex flex-col space-y-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="console"
              value="PS4"
              className="form-radio text-blue-500 focus:ring focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">PS4</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="console"
              value="PS5"
              className="form-radio text-blue-500 focus:ring focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">PS5</span>
          </label>
        </div>
      </div>

      {/* Filtro Versión */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Versión</label>
        <div className="flex flex-col space-y-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="version"
              value="Fisico"
              className="form-radio text-blue-500 focus:ring focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Físico</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="version"
              value="Digital"
              className="form-radio text-blue-500 focus:ring focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Digital</span>
          </label>
        </div>
      </div>

      {/* Ordenar */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Ordenar</label>
        <select
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Ordenar</option>
          <option value="asc">Menor precio</option>
          <option value="desc">Mayor precio</option>
        </select>
      </div>

      {/* Botón Aplicar Filtros */}
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full transition duration-300">
        Aplicar Filtros
      </button>
    </div>
  );
};

export default SidebarFilter;
