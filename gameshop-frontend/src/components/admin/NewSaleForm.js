import React, { useState, useEffect } from "react";
import axios from "axios";

const NewSaleForm = () => {
  const [games, setGames] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedGames, setSelectedGames] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchGames();
    fetchUsers();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await axios.get("http://localhost:8080/games");
      setGames(response.data);
    } catch (error) {
      console.error("Error al obtener videojuegos", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error al obtener usuarios", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/sale", {
        userId: selectedUser,
        gameIds: selectedGames,
        quantity,
      });
      alert("Venta registrada con éxito");
    } catch (error) {
      console.error("Error al registrar la venta", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Registrar Nueva Venta</h2>
      <div className="mb-4">
        <label className="block mb-2">Usuario:</label>
        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} className="w-full p-2 border rounded">
          <option value="">Seleccionar usuario</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.esPremium ? "Premium" : "Regular"})
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Videojuegos:</label>
        <select multiple value={selectedGames} onChange={(e) => setSelectedGames([...e.target.selectedOptions].map(o => o.value))} className="w-full p-2 border rounded">
          {games.map((game) => (
            <option key={game.id} value={game.id}>
              {game.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Cantidad:</label>
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="1" className="w-full p-2 border rounded" />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
        Registrar Venta
      </button>
    </form>
  );
};

export default NewSaleForm;
