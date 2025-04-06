"use client";

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import PixCopia from "../pixCopia/pixCopia";

export default function ModalItemPrev({
  presente,
  isModalOpen,
  setIsModalOpen,
}) {

  const [nomeLocal, setNomeLocal] = useState("")

  useEffect(() => {
    setNomeLocal(localStorage.getItem("nome"))
  }, [])
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
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-xl transform transition duration-300 flex flex-col justify-start items-start gap-2 hover:scale-105 m-3">
            <button
              type="button"
              className="absolute top-0 right-0 p-3 py-2 text-xl hover:text-red-600 "
              onClick={handleClose}
            >
              {" "}
              <FontAwesomeIcon icon={faClose} />
            </button>
            <h2 className="text-lg font-bold mb-4">{presente.nome}</h2>

            <h2 className="font-bold text-md md:text-xl text-center mb-4">
              Você pode comprar o produto ou <br /> enviar o valor diretamente!
            </h2>

            <div className="w-full flex flex-col justify-start gap-2">
              <div className="w-full flex flex-col items-center justify-center">
                <img
                  src={`/produtos/${presente.imagem}`}
                  alt={presente.nome}
                  className="w-64 h-auto"
                />
              </div>
              <p>
                Para reserva-lo clique em{" "}
                <span className="font-bold">selecionar</span>
              </p>
              <p>
                Valor: <span className="font-bold">{presente.preco}</span>
              </p>
            </div>

            <button type="button">
              <a
                href={presente.link}
                target="_blank"
                className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              >
                Acessar a loja
              </a>
            </button>
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
              {nomeLocal === presente.nomePresenteador
                ? "Este produto foi reservado por você"
                : "Este produto já foi reservado"}
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
                Valor: <span className="font-bold">{presente.preco}</span>
              </p>
            </div>
            <button type="button" className="mt-2">
              <a
                href={presente.link}
                target="_blank"
                className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              >
                Ver na loja
              </a>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
