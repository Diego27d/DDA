import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importa useNavigate
import axios from "axios";

const GameDetails = () => {
  const { id } = useParams(); // Obtiene el ID de la URL
  const navigate = useNavigate(); // Hook para navegación
  const [game, setGame] = useState(null); // Estado para almacenar los datos del juego
  const [loading, setLoading] = useState(true); // Estado para saber si los datos se están cargando
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const fetchGame = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/game/${id}`);
        setGame(response.data);
      } catch (err) {
        setError("Error al obtener los detalles del juego.");
      } finally {
        setLoading(false);
      }
    };
    fetchGame();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-800 to-purple-800 text-white">
        <p className="text-xl font-semibold">Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-800 to-purple-800 text-white">
        <p style={{ color: "red" }} className="text-xl font-semibold">{error}</p>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-800 to-purple-800 text-white">
        <p className="text-xl font-semibold">Juego no encontrado.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-800 to-purple-800 text-white">
      <div className="p-8 bg-gradient-to-br from-blue-900 to-purple-900 shadow-md rounded-md max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">{game.nombre}</h1>
        <p className="mb-4 text-lg">{game.descripcion}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <p className="text-xl">Precio: <span className="font-semibold">${game.precio}</span></p>
          <p className="text-lg">Consola: {game.consola}</p>
          <p className="text-lg">Idioma: {game.idioma}</p>
          <p className="text-lg">Género: {game.genero}</p>
          <p className="text-lg">Peso: {game.peso}</p>
          <p className="text-lg">Versión: {game.version}</p>
        </div>

        {/* Imágenes del Juego */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Imágenes del Juego</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {game.imguno && (
              <img
                src={game.imguno}
                alt="Imagen 1"
                className="w-1/3 h-64 object-cover rounded-md shadow-md border border-gray-300"
              />
            )}
            {game.imgdos && (
              <img
                src={game.imgdos}
                alt="Imagen 2"
                className="w-1/3 h-64 object-cover rounded-md shadow-md border border-gray-300"
              />
            )}
            {game.imgtres && (
              <img
                src={game.imgtres}
                alt="Imagen 3"
                className="w-1/3 h-64 object-cover rounded-md shadow-md border border-gray-300"
              />
            )}
          </div>
        </div>

        {/* Video del Juego */}
        {game.video && (
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4 text-center">Trailer del Juego</h3>
            <iframe
              width="100%"
              height="400"
              src={game.video}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-md shadow-md border border-gray-300"
            ></iframe>
          </div>
        )}

        {/* Botón de Volver */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold px-6 py-3 rounded-md shadow-md hover:from-blue-700 hover:to-blue-900 transition-all"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
