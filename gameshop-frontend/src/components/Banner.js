import React from "react";

const Banner = () => {
  return (
    <div className="relative w-full h-[500px] bg-gradient-to-r from-blue-800 via-blue-700 to-purple-600 overflow-hidden">
      <div className="absolute top-1/2 left-8 transform -translate-y-1/2 z-10 text-white">
        <h1 className="text-5xl font-bold mb-6">
          Compra juegos digitales y físicos
          <br />
          de forma rápida y segura
        </h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none transition duration-300">
          COMPRAR AHORA
        </button>
      </div>
      <img
        src={require("../imgs/banner.png")}
        alt="Juegos populares"
        className="absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-[50%] w-[65%] max-w-2xl"
      />
    </div>
  );
};

export default Banner;
