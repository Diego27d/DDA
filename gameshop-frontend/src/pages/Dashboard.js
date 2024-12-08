import React, { useState, useEffect } from "react";
import axios from "axios";
import GameCard from "../components/GameCard";
import SidebarFilter from "../components/SidebarFilter";
import Banner from "../components/Banner";

const Dashboard = () => {
  const [games, setGames] = useState([]); // Almacena los juegos
  const [loading, setLoading] = useState(true); // Indica si está cargando
  const [error, setError] = useState(null); // Almacena errores

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get("http://localhost:8080/games"); // Llama a la API
        console.log("Datos recibidos:", response.data); // Verifica los datos en consola
        setGames(response.data); // Almacena los juegos en el estado
        setError(null); // Limpia errores si todo sale bien
      } catch (err) {
        console.error("Error al cargar los juegos:", err); // Muestra el error en consola
        setError("No se pudieron cargar los juegos. Inténtalo más tarde.");
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    };
    fetchGames();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Banner superior */}
      <Banner />

      <div className="flex flex-wrap p-8">
        {/* Filtro lateral */}
        <SidebarFilter />

        {/* Contenido principal de juegos */}
        <div className="flex-1 pl-8">
          <h1 className="text-3xl font-bold mb-8 text-center lg:text-left">
            Juegos Disponibles
          </h1>

          {loading && (
            <p className="text-center text-gray-600">Cargando juegos...</p>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-center">
              {error}
            </div>
          )}

          {!loading && !error && games.length === 0 && (
            <p className="text-center text-gray-600">
              No hay juegos disponibles.
            </p>
          )}

          {/* Listado de juegos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
