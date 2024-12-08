import React from 'react';

const Footer = () => {
  return (
<div class="mt-8 bg-gradient-to-r from-blue-800 to-purple-800 pt-9">
  <div class="mx-auto w-full max-w-[1166px] px-4 xl:px-0">
    <div class="flex flex-col justify-between sm:px-[18px] md:flex-row md:px-10">
      <div class="md:w-[316px]">
        <h1 class="text-white font-extrabold">
          <span class="text-rose-600">GAME</span>STORE
        </h1>
        <p class="mt-[18px] text-[15px] font-normal text-white/[80%]">
          GameStore es tu tienda de videojuegos digitales y físicos para todas las consolas, con precios accesibles y las últimas novedades.
        </p>
        <div class="mt-[18px] flex gap-4">
          <a class="hover:scale-110" target="_blank" href="#">
            <img alt="facebook icon" loading="lazy" width="36" height="36" decoding="async" src="https://cdn-icons-png.flaticon.com/512/733/733547.png" />
          </a>
          <a class="hover:scale-110" target="_blank" href="#">
            <img alt="linkedin icon" loading="lazy" width="36" height="36" decoding="async" src="https://cdn-icons-png.flaticon.com/512/733/733561.png" />
          </a>
          <a class="hover:scale-110" target="_blank" href="#">
            <img alt="instagram icon" loading="lazy" width="36" height="36" decoding="async" src="https://cdn-icons-png.flaticon.com/512/733/733558.png" />
          </a>
          <a class="hover:scale-110" target="_blank" href="#">
            <img alt="twitter icon" loading="lazy" width="36" height="36" decoding="async" src="https://cdn-icons-png.flaticon.com/512/733/733579.png" />
          </a>
          <a class="hover:scale-110" target="_blank" href="#">
            <img alt="youtube icon" loading="lazy" width="36" height="36" decoding="async" src="https://cdn-icons-png.flaticon.com/512/174/174883.png" />
          </a>
        </div>
      </div>

      <div class="md:w-[316px]">
        <div class="mt-[23px] flex">
          <div class="flex h-[38px] w-[38px] items-center justify-center rounded-[75%]">
            <img alt="phone icon" src="https://cdn-icons-png.flaticon.com/512/724/724664.png" width="24" height="24" />
          </div>
          <div class="ml-[18px]">
            <a href="tel:+59812345678" class="font-Inter text-[14px] font-medium text-white">+598 091 899 082</a>
            <p class="font-Inter text-[12px] font-medium text-white">Número de Soporte</p>
          </div>
        </div>
        <div class="mt-[23px] flex">
          <div class="flex h-[38px] w-[38px] items-center justify-center rounded-[75%]">
            <img alt="email icon" src="https://cdn-icons-png.flaticon.com/512/561/561127.png" width="24" height="24" />
          </div>
          <div class="ml-[18px]">
            <a href="mailto:soporte@gamestore.com" class="font-Inter text-[14px] font-medium text-white">soporte@gamestore.com</a>
            <p class="font-Inter text-[12px] font-medium text-white">Correo de Soporte</p>
          </div>
        </div>
        <div class="mt-[23px] flex">
          <div class="flex h-[38px] w-[38px] items-center justify-center rounded-[75%]">
            <img alt="location icon" src="https://cdn-icons-png.flaticon.com/512/684/684908.png" width="24" height="24" />
          </div>
          <div class="ml-[18px]">
            <p class="font-Inter text-[14px] font-medium text-white">Montevideo, Uruguay</p>
            <p class="font-Inter text-[12px] font-medium text-white">Dirección: Julio Rodriguez 133</p>
          </div>
        </div>
      </div>

      <div class="mt-6 flex w-full flex-col justify-between text-white sm:flex-row md:mt-0 md:max-w-[341px]">
        <div class="">
          <p class="text-white font-inter text-[18px] font-medium leading-normal">Páginas</p>
          <ul>
            <li class="mt-[15px]"><a class="text-white hover:text-white/80 font-inter text-[15px] font-normal hover:font-semibold" href="/">Inicio</a></li>
            <li class="mt-[15px]"><a class="text-white hover:text-white/80 font-inter text-[15px] font-normal hover:font-semibold" href="/news">Noticias</a></li>
            <li class="mt-[15px]"><a class="text-white hover:text-white/80 font-inter text-[15px] font-normal hover:font-semibold" href="/contact">Contacto</a></li>
            <li class="mt-[15px]"><a class="text-white hover:text-white/80 font-inter text-[15px] font-normal hover:font-semibold" href="/terms-and-conditions">Términos y Condiciones</a></li>
            <li class="mt-[15px]"><a class="text-white hover:text-white/80 font-inter text-[15px] font-normal hover:font-semibold" href="/privacy-policy">Política de Privacidad</a></li>
          </ul>
        </div>
        <div class="mt-6 flex flex-col gap-4 sm:mt-0">
          <p class="text-white font-inter text-[18px] font-medium">Descarga la App</p>
          <div class="flex gap-4 sm:flex-col">
            <a target="_blank" href="#">
              <img alt="google play" loading="lazy" width="168" height="50" decoding="async" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/512px-Google_Play_Store_badge_EN.svg.png" />
            </a>
            <a target="_blank" href="#">
              <img alt="apple store" loading="lazy" width="168" height="50" decoding="async" src="https://upload.wikimedia.org/wikipedia/commons/5/5d/Available_on_the_App_Store_%28black%29.png" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <hr class="mt-[30px] text-white" />
    <div class="flex items-center justify-center pb-8 pt-[9px] md:py-8">
      <p class="text-[10px] font-normal text-white md:text-[12px]">
        © Copyright 2024, Todos los Derechos Reservados por GAMESTORE.
      </p>
    </div>
  </div>
</div>

  );
};

export default Footer;
