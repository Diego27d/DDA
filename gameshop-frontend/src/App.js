import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import FullCart from "./pages/FullCart";
import GameDetails from "./pages/GameDetails";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import Checkout from "./pages/Checkout";

// Importar los componentes del Admin Dashboard
import AdminDashboard from "./components/admin/AdminDashboard";
import GamesAdmin from "./components/admin/GamesAdmin";
import UsersAdmin from "./components/admin/UsersAdmin";
import SalesAdmin from "./components/admin/SalesAdmin";
import NewSaleForm from "./components/admin/NewSaleForm";
import AddGameForm from "./components/admin/AddGameForm";

// Componente para proteger rutas privadas
function PrivateRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.authorities && user.authorities.some(role => role.authority === "ROLE_ADMIN")) {
    return children;
  }
  return <Navigate to="/" />;
}

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Cart /> {/* Sidebar del carrito */}
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cart" element={<FullCart />} />
          <Route path="/games/:id" element={<GameDetails />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* Rutas administrativas protegidas */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/games"
            element={
              <PrivateRoute>
                <GamesAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <PrivateRoute>
                <UsersAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/sales"
            element={
              <PrivateRoute>
                <SalesAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/new-sale"
            element={
              <PrivateRoute>
                <NewSaleForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/add-game"
            element={
              <PrivateRoute>
                <AddGameForm />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
