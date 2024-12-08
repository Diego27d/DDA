import React, { useEffect, useState } from "react";
import axios from "axios";

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    id: "",
    email: "",
    password: "",
    isAdmin: false,
    name: "",
    surname: "",
    gender: "",
    esPremium: false,
    fechaMembresia: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error al obtener usuarios", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8080/user/${userId}`);
        setUsers(users.filter((user) => user.id !== userId));
      } catch (error) {
        console.error("Error al eliminar usuario", error);
      }
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/user/${editingUser.id}`, editingUser);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Error al editar el usuario", error);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/user", newUser);
      setNewUser({
        id: "",
        email: "",
        password: "",
        isAdmin: false,
        name: "",
        surname: "",
        gender: "",
        esPremium: false,
        fechaMembresia: "",
      });
      fetchUsers();
    } catch (error) {
      console.error("Error al agregar el usuario", error);
    }
  };

  return (
    <div className="users-admin p-8">
      <h1 className="text-3xl font-bold mb-4">Gestión de Usuarios</h1>

      {/* Formulario para agregar o editar usuario */}
      <div className="mb-8">
        {editingUser ? (
          <form onSubmit={handleSubmitEdit} className="mb-4">
            <h2 className="text-xl font-bold mb-4">Editar Usuario</h2>
            <input
              type="text"
              value={editingUser.id}
              onChange={(e) => setEditingUser({ ...editingUser, id: e.target.value })}
              placeholder="ID"
              className="p-2 border rounded mb-2 w-full"
              required
            />
            <input
              type="text"
              value={editingUser.name}
              onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
              placeholder="Nombre"
              className="p-2 border rounded mb-2 w-full"
              required
            />
            <input
              type="text"
              value={editingUser.surname}
              onChange={(e) => setEditingUser({ ...editingUser, surname: e.target.value })}
              placeholder="Apellido"
              className="p-2 border rounded mb-2 w-full"
              required
            />
            <input
              type="email"
              value={editingUser.email}
              onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
              placeholder="Email"
              className="p-2 border rounded mb-2 w-full"
              required
            />
            <input
              type="password"
              value={editingUser.password}
              onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
              placeholder="Contraseña"
              className="p-2 border rounded mb-2 w-full"
              required
            />
            <input
              type="text"
              value={editingUser.gender}
              onChange={(e) => setEditingUser({ ...editingUser, gender: e.target.value })}
              placeholder="Género"
              className="p-2 border rounded mb-2 w-full"
              required
            />
            <input
              type="date"
              value={editingUser.fechaMembresia}
              onChange={(e) => setEditingUser({ ...editingUser, fechaMembresia: e.target.value })}
              placeholder="Fecha de Membresía"
              className="p-2 border rounded mb-2 w-full"
              required
            />
            <div className="flex items-center gap-2 mb-2">
              <label>Premium:</label>
              <input
                type="checkbox"
                checked={editingUser.esPremium}
                onChange={(e) => setEditingUser({ ...editingUser, esPremium: e.target.checked })}
              />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <label>Admin:</label>
              <input
                type="checkbox"
                checked={editingUser.isAdmin}
                onChange={(e) => setEditingUser({ ...editingUser, isAdmin: e.target.checked })}
              />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Guardar Cambios</button>
              <button onClick={handleCancelEdit} className="bg-gray-500 text-white px-4 py-2 rounded">Cancelar</button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleAddUser} className="mb-4">
            <h2 className="text-xl font-bold mb-4">Agregar Nuevo Usuario</h2>
            <input
              type="text"
              value={newUser.id}
              onChange={(e) => setNewUser({ ...newUser, id: e.target.value })}
              placeholder="ID"
              className="p-2 border rounded mb-2 w-full"
              required
            />
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              placeholder="Nombre"
              className="p-2 border rounded mb-2 w-full"
              required
            />
            <input
              type="text"
              value={newUser.surname}
              onChange={(e) => setNewUser({ ...newUser, surname: e.target.value })}
              placeholder="Apellido"
              className="p-2 border rounded mb-2 w-full"
              required
            />
            <input
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              placeholder="Email"
              className="p-2 border rounded mb-2 w-full"
              required
            />
            <input
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              placeholder="Contraseña"
              className="p-2 border rounded mb-2 w-full"
              required
            />
            <input
              type="text"
              value={newUser.gender}
              onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })}
              placeholder="Género"
              className="p-2 border rounded mb-2 w-full"
              required
            />
            <input
              type="date"
              value={newUser.fechaMembresia}
              onChange={(e) => setNewUser({ ...newUser, fechaMembresia: e.target.value })}
              placeholder="Fecha de Membresía"
              className="p-2 border rounded mb-2 w-full"
              required
            />
            <div className="flex items-center gap-2 mb-2">
              <label>Premium:</label>
              <input
                type="checkbox"
                checked={newUser.esPremium}
                onChange={(e) => setNewUser({ ...newUser, esPremium: e.target.checked })}
              />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <label>Admin:</label>
              <input
                type="checkbox"
                checked={newUser.isAdmin}
                onChange={(e) => setNewUser({ ...newUser, isAdmin: e.target.checked })}
              />
            </div>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Agregar Usuario</button>
          </form>
        )}
      </div>

      {/* Tabla de usuarios */}
      <table className="table-auto w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-4 text-left">ID</th>
            <th className="p-4 text-left">Nombre</th>
            <th className="p-4 text-left">Apellido</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Género</th>
            <th className="p-4 text-left">Fecha de Membresía</th>
            <th className="p-4 text-left">Premium</th>
            <th className="p-4 text-left">Admin</th>
            <th className="p-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-4">{user.id}</td>
              <td className="p-4">{user.name}</td>
              <td className="p-4">{user.surname}</td>
              <td className="p-4">{user.email}</td>
              <td className="p-4">{user.gender}</td>
              <td className="p-4">{user.fechaMembresia}</td>
              <td className="p-4">{user.esPremium ? "Sí" : "No"}</td>
              <td className="p-4">{user.isAdmin ? "Sí" : "No"}</td>
              <td className="p-4 flex gap-2">
                <button
                  onClick={() => handleEditUser(user)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white px-4 py-2 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
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

export default UsersAdmin;
