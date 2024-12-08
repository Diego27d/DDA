import React, { useEffect, useState } from "react";
import axios from "axios";

const GamesAdmin = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await axios.get("http://localhost:8080/games");
      setGames(response.data);
    } catch (error) {
      console.error("Error al obtener videojuegos", error);
    }
  };

  const handleDelete = async (gameId) => {
    try {
      await axios.delete(`http://localhost:8080/game/${gameId}`);
      fetchGames(); // Recargar la lista después de eliminar
    } catch (error) {
      console.error("Error al eliminar videojuego", error);
    }
  };

  return (
    <div className="games-admin p-8">
      <h1 className="text-3xl font-bold mb-4">Gestión de Videojuegos</h1>
      <table className="table-auto w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.id}>
              <td>{game.nombre}</td>
              <td>{game.descripcion}</td>
              <td>{game.stock}</td>
              <td>
                <button onClick={() => handleDelete(game.id)} className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GamesAdmin;