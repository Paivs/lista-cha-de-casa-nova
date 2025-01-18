"use client";

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import PixCopia from "../pixCopia/pixCopia";

export default function ModalItem({ presente, isModalOpen, setIsModalOpen }) {
  const handleClickOutside = (event) => {
    if (event.target.id === "modalComprar") {
      handleClose();
    }
  };

  function handleClose() {
    setIsModalOpen(false);
  }

  return (
    <>
      <div
        id="modalComprar"
        className={`fixed inset-0 flex items-center justify-center z-50 ${
          isModalOpen ? "block" : "hidden"
        }`}
        onClick={handleClickOutside}
      >
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50"></div>

        {presente.estado === "disponivel" ? (
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-xl transform transition duration-300 hover:scale-105 m-3">
            <button
              type="button"
              className="absolute top-0 right-0 p-3 py-2 text-xl hover:text-red-600 "
              onClick={handleClose}
            >
              {" "}
              <FontAwesomeIcon icon={faClose} />
            </button>
            <h2 className="text-lg font-bold mb-4">{presente.nome}</h2>

            <h2 className="font-bold text-xl text-center mb-4">
              Você pode comprar o produto ou <br /> enviar o valor diretamente!
            </h2>

            <div className="w-full flex flex-col justify-start">
              <div className="w-full flex flex-col items-center justify-center">
                <img
                  src={`/produtos/${presente.imagem}`}
                  alt={presente.nome}
                  className="w-64 h-auto"
                />
              </div>
              <p>
                Valor: <span className="font-bold"> {presente.preco}</span>
              </p>
            </div>

            <div className="w-full overflow-clip">
              <a
                href={presente.link}
                className="text-blue-500 underline hover:text-blue-700 overflow-clip text-wrap"
              >
                {presente.link}
              </a>
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-xl transform transition duration-300 hover:scale-105 m-3">
            <button
              type="button"
              className="absolute top-0 right-0 p-3 py-2 text-xl hover:text-red-600 "
              onClick={handleClose}
            >
              {" "}
              <FontAwesomeIcon icon={faClose} />
            </button>
            <h2 className="text-lg font-bold mb-4">{presente.nome}</h2>

            <h2 className="font-bold text-xl text-center mb-4">
              ESTE PRODUTO JÁ FOI RESERVADO
            </h2>

            <div className="w-full flex flex-col justify-start">
              <div className="w-full flex flex-col items-center justify-center">
                <img
                  src={`/produtos/${presente.imagem}`}
                  alt={presente.nome}
                  className="w-64 h-auto"
                />
              </div>
              <p>
                Valor: <span className="font-bold"> {presente.preco}</span>
              </p>
            </div>
            <div className="w-full overflow-clip">
              <a
                href={presente.link}
                target="_blank"
                className="text-blue-500 underline hover:text-blue-700 overflow-clip text-wrap block truncate"
                style={{
                  display: "webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  overflow: "hidden",
                }}
              >
                {presente.link}
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
