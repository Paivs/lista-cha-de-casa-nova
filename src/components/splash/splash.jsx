"use client";

import React, { useEffect, useState } from "react";
import Loader from "../loader/loader";

export default function Splash() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHidden, setIsHidden] = useState(false); // Para ocultar só depois da animação

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2750);

    const hideTimer = setTimeout(() => {
      setIsHidden(true);
    }, 3750); // Espera 1s a mais para garantir a transição

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9999] w-full h-full bg-background transition-opacity duration-1000 ${
        isLoaded ? "opacity-0" : "opacity-100"
      } ${isHidden ? "invisible pointer-events-none" : ""}`}
    >
      <div className="w-full h-full flex flex-col gap-8 items-center justify-center">
        <div className="mb-12 text-center">
          <h1 className="font-bold text-4xl md:text-6xl">
            Chá de casa nova <br />
            da Lívia e do Gustavo
          </h1>
        </div>

        <Loader />
      </div>
    </div>
  );
}
