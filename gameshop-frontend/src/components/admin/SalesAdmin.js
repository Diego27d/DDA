import React, { useEffect, useState } from "react";
import axios from "axios";

const SalesAdmin = () => {
  const [sales, setSales] = useState([]);
  const [editingSale, setEditingSale] = useState(null);
  const [newSale, setNewSale] = useState({
    userId: "",
    gameId: "",
    amount: 1,
  });

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await axios.get("http://localhost:8080/sales");
      setSales(response.data);
    } catch (error) {
      console.error("Error al obtener ventas", error);
    }
  };

  const handleDeleteSale = async (saleId) => {
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar esta venta?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8080/sale/${saleId}`);
        setSales(sales.filter((sale) => sale.id !== saleId));
      } catch (error) {
        console.error("Error al eliminar la venta", error);
      }
    }
  };

  const handleEditSale = (sale) => {
    setEditingSale(sale);
  };

  const handleCancelEdit = () => {
    setEditingSale(null);
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/sale/${editingSale.id}`, editingSale);
      setEditingSale(null);
      fetchSales();
    } catch (error) {
      console.error("Error al editar la venta", error);
    }
  };

  const handleAddSale = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/sale", newSale);
      setNewSale({
        userId: "",
        gameId: "",
        amount: 1,
      });
      fetchSales();
    } catch (error) {
      console.error("Error al agregar la venta", error);
    }
  };

  return (
    <div className="sales-admin p-8">
      <h1 className="text-3xl font-bold mb-4">Gestión de Ventas</h1>

      {/* Formulario para agregar o editar venta */}
      <div className="mb-8">
        {editingSale ? (
          <form onSubmit={handleSubmitEdit} className="mb-4">
            <h2 className="text-xl font-bold mb-4">Editar Venta</h2>
            <input
              type="text"
              value={editingSale.userId}
              onChange={(e) => setEditingSale({ ...editingSale, userId: e.target.value })}
              placeholder="ID del Usuario"
              className="p-2 border rounded mb-2 w-full"
              required
            />
            <input
              type="text"
              value={editingSale.gameId}
              onChange={(e) => setEditingSale({ ...editingSale, gameId: e.target.value })}
              placeholder="ID del Juego"
              className="p-2 border rounded mb-2 w-full"
              required
            />
            <input
              type="number"
              value={editingSale.amount}
              onChange={(e) => setEditingSale({ ...editingSale, amount: e.target.value })}
              placeholder="Cantidad"
              className="p-2 border rounded mb-2 w-full"
              required
            />
            <div className="flex gap-2">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Guardar Cambios</button>
              <button onClick={handleCancelEdit} className="bg-gray-500 text-white px-4 py-2 rounded">Cancelar</button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleAddSale} className="mb-4">
            <h2 className="text-xl font-bold mb-4">Agregar Nueva Venta</h2>
            <input
              type="text"
              value={newSale.userId}
              onChange={(e) => setNewSale({ ...newSale, userId: e.target.value })}
              placeholder="ID del Usuario"
              className="p-2 border rounded mb-2 w-full"
              required
            />
            <input
              type="text"
              value={newSale.gameId}
              onChange={(e) => setNewSale({ ...newSale, gameId: e.target.value })}
              placeholder="ID del Juego"
              className="p-2 border rounded mb-2 w-full"
              required
            />
            <input
              type="number"
              value={newSale.amount}
              onChange={(e) => setNewSale({ ...newSale, amount: e.target.value })}
              placeholder="Cantidad"
              className="p-2 border rounded mb-2 w-full"
              required
            />
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Agregar Venta</button>
          </form>
        )}
      </div>

      {/* Tabla de ventas */}
      <table className="table-auto w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-4 text-left">ID de Venta</th>
            <th className="p-4 text-left">ID de Usuario</th>
            <th className="p-4 text-left">ID de Juego</th>
            <th className="p-4 text-left">Cantidad</th>
            <th className="p-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id} className="border-t">
              <td className="p-4">{sale.id}</td>
              <td className="p-4">{sale.userId}</td>
              <td className="p-4">{sale.gameId}</td>
              <td className="p-4">{sale.amount}</td>
              <td className="p-4 flex gap-2">
                <button
                  onClick={() => handleEditSale(sale)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white px-4 py-2 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteSale(sale.id)}
                  className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
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

export default SalesAdmin;
