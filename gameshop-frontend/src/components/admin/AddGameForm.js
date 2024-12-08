import React, { useState } from "react";
import axios from "axios";

const AddGameForm = () => {
  const [gameData, setGameData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    consola: "",
    idioma: "",
    genero: "",
    peso: "",
    version: "",
    imguno: "",
    imgdos: "",
    imgtres: "",
    video: "",
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setGameData({
      ...gameData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/game", gameData);
      setMessage(`Juego agregado con éxito: ${response.data.nombre}`);
    } catch (error) {
      setMessage("Error al agregar el juego, inténtalo de nuevo.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-purple-800 text-white flex items-center justify-center p-8">
      <div className="w-full max-w-lg bg-gradient-to-br from-blue-700 to-purple-700 p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-6">Agregar Videojuego</h2>
        {message && (
          <p className="mb-4 text-center text-lg font-semibold">{message}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="nombre">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              value={gameData.nombre}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded text-gray-900"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="descripcion">
              Descripción
            </label>
            <textarea
              name="descripcion"
              value={gameData.descripcion}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded text-gray-900"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="precio">
              Precio
            </label>
            <input
              type="number"
              name="precio"
              value={gameData.precio}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded text-gray-900"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="consola">
              Consola
            </label>
            <input
              type="text"
              name="consola"
              value={gameData.consola}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded text-gray-900"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="idioma">
              Idioma
            </label>
            <input
              type="text"
              name="idioma"
              value={gameData.idioma}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded text-gray-900"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="genero">
              Género
            </label>
            <input
              type="text"
              name="genero"
              value={gameData.genero}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded text-gray-900"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="peso">
              Peso
            </label>
            <input
              type="text"
              name="peso"
              value={gameData.peso}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded text-gray-900"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="version">
              Versión
            </label>
            <input
              type="text"
              name="version"
              value={gameData.version}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded text-gray-900"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="imguno">
              Imagen 1 (URL)
            </label>
            <input
              type="text"
              name="imguno"
              value={gameData.imguno}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded text-gray-900"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="imgdos">
              Imagen 2 (URL)
            </label>
            <input
              type="text"
              name="imgdos"
              value={gameData.imgdos}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded text-gray-900"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="imgtres">
              Imagen 3 (URL)
            </label>
            <input
              type="text"
              name="imgtres"
              value={gameData.imgtres}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded text-gray-900"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="video">
              Video (YouTube URL)
            </label>
            <input
              type="text"
              name="video"
              value={gameData.video}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded text-gray-900"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 transition-all"
          >
            Agregar Videojuego
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGameForm;
