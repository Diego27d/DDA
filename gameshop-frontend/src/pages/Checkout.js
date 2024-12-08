import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const countries = ["Uruguay", "Argentina", "Chile"];
  const [menu, setMenu] = useState(false);
  const [country, setCountry] = useState("Uruguay");

  const changeText = (e) => {
    setMenu(false);
    setCountry(e.target.textContent);
  };

  // Calcular el monto total asegurando que precio y cantidad sean numéricos
  const totalAmount = cart.reduce((total, game) => {
    const precio = parseFloat(game.precio) || 0; // Convertir a número y establecer 0 si es inválido
    const cantidad = parseInt(game.cantidad) || 1; // Convertir a número y establecer 1 si es inválido
    return total + precio * cantidad;
  }, 0).toFixed(2); // Asegurar que el total se muestre con dos decimales

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-blue-800 to-purple-800 text-white min-h-screen">
      <div className="py-16 px-4 md:px-6 2xl:px-0 flex justify-center items-center 2xl:mx-auto 2xl:container">
        <div className="flex flex-col justify-start items-start w-full space-y-9">
          <div className="flex justify-start flex-col items-start space-y-2">
            <button
              className="flex flex-row items-center text-white hover:text-blue-300 space-x-1"
              onClick={() => navigate("/cart")}
            >
              <svg
                className="fill-stroke"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.91681 7H11.0835"
                  stroke="currentColor"
                  strokeWidth="0.666667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.91681 7L5.25014 9.33333"
                  stroke="currentColor"
                  strokeWidth="0.666667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.91681 7.00002L5.25014 4.66669"
                  stroke="currentColor"
                  strokeWidth="0.666667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-sm leading-none">Atrás</p>
            </button>
            <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-white">
              Checkout
            </p>
            <p className="text-base leading-normal sm:leading-4 text-gray-300">
              Inicio {">"} Carrito {">"} Checkout
            </p>
          </div>

          <div className="flex flex-col xl:flex-row justify-center xl:justify-between space-y-6 xl:space-y-0 xl:space-x-6 w-full">
            {/* Mostrar todos los juegos en el carrito */}
            <div className="xl:w-3/5 flex flex-col justify-center items-center bg-gradient-to-br from-blue-700 to-purple-700 py-7 px-10 xl:w-full rounded-md shadow-md space-y-6">
              {cart.length > 0 ? (
                cart.map((game) => {
                  const precio = parseFloat(game.precio) || 0;
                  const cantidad = parseInt(game.cantidad) || 1;
                  return (
                    <div key={game.id} className="flex flex-col justify-center items-center w-full space-y-4">
                      <div className="flex flex-col justify-start items-start w-full space-y-4">
                        <p className="text-xl md:text-2xl leading-normal text-white">
                          {game.nombre}
                        </p>
                        <p className="text-base font-semibold leading-none text-gray-300">
                          ${precio.toFixed(2)} x {cantidad} = ${(precio * cantidad).toFixed(2)}
                        </p>
                      </div>
                      <div className="w-64 h-64 flex items-center justify-center">
                        <img
                          src={game.imguno}
                          alt={game.nombre}
                          className="object-contain w-full h-full"
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-300">No hay artículos en el carrito.</p>
              )}
              {/* Mostrar el total al final */}
              {cart.length > 0 && (
                <div className="w-full text-right">
                  <p className="text-2xl font-bold text-white mt-4">
                    Total: ${totalAmount}
                  </p>
                </div>
              )}
            </div>

            {/* Detalles del pago */}
            <div className="p-8 bg-gradient-to-br from-blue-700 to-purple-700 flex flex-col lg:w-full xl:w-3/5 rounded-md shadow-md">
              <button className="border border-transparent hover:border-gray-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:bg-white text-white hover:text-gray-900 flex flex-row justify-center items-center space-x-2 py-4 rounded w-full transition-all">
                <div>
                  <svg
                    className="fill-current"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.9099 4.27692C9.6499 4.27692 9.1174 4.87817 8.2399 4.87817C7.34021 4.87817 6.65396 4.28129 5.56208 4.28129C4.49333 4.28129 3.35365 4.93379 2.6299 6.04535C1.61365 7.61285 1.78615 10.565 3.43208 13.08C4.02083 13.9804 4.80708 14.99 5.83833 15.001H5.85708C6.75333 15.001 7.01958 14.4141 8.25302 14.4072H8.27177C9.48677 14.4072 9.73052 14.9975 10.623 14.9975H10.6418C11.673 14.9866 12.5015 13.8679 13.0902 12.971C13.514 12.326 13.6715 12.0022 13.9965 11.2725C11.6155 10.3688 11.233 6.99348 13.5877 5.69942C12.869 4.79942 11.859 4.27817 10.9068 4.27817L10.9099 4.27692Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-base leading-4">Pagar</p>
                </div>
              </button>

              <div className="flex flex-row justify-center items-center mt-6">
                <hr className="border w-full" />
                <p className="flex flex-shrink-0 px-4 text-base leading-4 text-gray-300">
                  o paga con tarjeta
                </p>
                <hr className="border w-full" />
              </div>

              <div className="mt-8">
                <input
                  className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-900"
                  type="email"
                  placeholder="Correo electrónico"
                />
              </div>

              <label className="mt-8 text-base leading-4 text-white">Detalles de la tarjeta</label>
              <div className="mt-2 flex-col">
                <div>
                  <input
                    className="border rounded-tl rounded-tr border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-900"
                    type="text"
                    placeholder="0000 1234 6549 15151"
                  />
                </div>
                <div className="flex-row flex">
                  <input
                    className="border rounded-bl border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-900"
                    type="text"
                    placeholder="MM/YY"
                  />
                  <input
                    className="border rounded-br border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-900"
                    type="text"
                    placeholder="CVC"
                  />
                </div>
              </div>

              <label className="mt-8 text-base leading-4 text-white">Nombre en la tarjeta</label>
              <div className="mt-2 flex-col">
                <div>
                  <input
                    className="border rounded border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-900"
                    type="text"
                    placeholder="Nombre en la tarjeta"
                  />
                </div>
              </div>

              <label className="mt-8 text-base leading-4 text-white">País o región</label>
              <div className="mt-2 flex-col">
                <div className="relative">
                  <button
                    className="text-left border rounded-tr rounded-tl border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-900 bg-white"
                    type="button"
                    onClick={() => setMenu(!menu)}
                  >
                    {country}
                  </button>
                  <svg
                    onClick={() => setMenu(!menu)}
                    className={
                      "transform cursor-pointer absolute top-4 right-4 " +
                      (menu ? "rotate-180" : "")
                    }
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.5 5.75L8 10.25L12.5 5.75"
                      stroke="#27272A"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div
                    className={
                      "mt-1 absolute z-10 w-full flex bg-gray-50 justify-start flex-col text-gray-600 " +
                      (menu ? "block" : "hidden")
                    }
                  >
                    {countries.map((country) => (
                      <div
                        key={country}
                        className="cursor-pointer hover:bg-blue-700 hover:text-white px-4 py-2"
                        onClick={changeText}
                      >
                        {country}
                      </div>
                    ))}
                  </div>
                </div>
                <input
                  className="border rounded-bl rounded-br border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-900"
                  type="text"
                  placeholder="Código Postal"
                />
              </div>

              <button className="mt-8 border border-transparent hover:border-gray-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:bg-white text-white hover:text-gray-900 flex justify-center items-center py-4 rounded w-full transition-all">
                <div>
                  <p className="text-base leading-4">Pagar ${totalAmount}</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
