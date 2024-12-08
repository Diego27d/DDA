import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../imgs/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="bg-gradient-to-r from-blue-800 via-blue-700 to-purple-600 shadow-md px-8 md:px-16 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <img
          src={Logo}
          alt="Game Shop Logo"
          className="h-40 w-auto max-w-full"
        />
      </div>

      {/* Links */}
      <ul className="flex space-x-6 text-white font-semibold">
        <li>
          <Link to="/dashboard" className="hover:text-indigo-200">
            Dashboard
          </Link>
        </li>
        <li>
          <button
            className="hover:text-indigo-200"
            onClick={() => navigate("/cart")} 
          >
            Carrito
          </button>
        </li>
        <li>
          <Link to="/search" className="hover:text-indigo-200">
            Búsqueda
          </Link>
        </li>
        <li>
          <Link to="/explore" className="hover:text-indigo-200">
            Explorar
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-indigo-200">
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-indigo-200">
            Contacto
          </Link>
        </li>
        {/* Links de administrador (solo si el usuario es administrador) */}
        {user && user.authorities && user.authorities.some(role => role.authority === "ROLE_ADMIN") && (
          <>
            <li>
              <Link to="/admin" className="hover:text-indigo-200">
                Admin Panel
              </Link>
            </li>
           
          </>
        )}
      </ul>

      {/* Login Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/");
          }}
          className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold focus:outline-none"
        >
          <span>{user ? "Logout" : "Login"}</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
