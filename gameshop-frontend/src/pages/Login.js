import React, { useState } from "react";
import { auth } from "../config/firebaseConfig";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Autenticar al usuario con Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Intentar obtener la información adicional del usuario desde la base de datos usando el correo electrónico
      const response = await axios.get(`http://localhost:8080/user/email/${firebaseUser.email}`);
      const userData = response.data;

      // Guardar los datos del usuario en el almacenamiento local para futuras referencias
      localStorage.setItem("user", JSON.stringify(userData));

      // Redirigir al usuario según su rol
      if (userData.is_admin) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Error al iniciar sesión. Por favor, revisa tus credenciales.");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      // Autenticar al usuario con Firebase usando Google
      const userCredential = await signInWithPopup(auth, provider);
      const firebaseUser = userCredential.user;

      // Intentar obtener la información adicional del usuario desde la base de datos usando el correo electrónico
      const response = await axios.get(`http://localhost:8080/user/email/${firebaseUser.email}`);
      const userData = response.data;

      // Guardar los datos del usuario en el almacenamiento local
      localStorage.setItem("user", JSON.stringify(userData));

      // Redirigir según el rol
      if (userData.is_admin) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Error al iniciar sesión con Google.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-800 to-purple-800">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Correo Electrónico"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Contraseña"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Iniciar Sesión
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-700 text-sm mb-4">O iniciar sesión con:</p>
          <button
            onClick={handleGoogleLogin}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Google
          </button>
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-700 text-sm">
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="text-blue-500 hover:text-blue-700 font-bold">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
