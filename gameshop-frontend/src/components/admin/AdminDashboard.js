import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard p-8">
      <h1 className="text-4xl font-bold mb-8">Panel de Administración</h1>
      <div className="grid gap-8 md:grid-cols-3">
        <Link to="/admin/games" className="bg-blue-500 hover:bg-blue-700 text-white p-6 rounded-lg shadow-md">
          Gestión de Videojuegos
        </Link>
        <Link to="/admin/add-game" className="bg-teal-500 hover:bg-teal-700 text-white p-6 rounded-lg shadow-md">
          Agregar Videojuego
        </Link>
        <Link to="/admin/users" className="bg-green-500 hover:bg-green-700 text-white p-6 rounded-lg shadow-md">
          Gestión de Usuarios
        </Link>
        <Link to="/admin/sales" className="bg-purple-500 hover:bg-purple-700 text-white p-6 rounded-lg shadow-md">
          Gestión de Ventas
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
