"use client";

import { useEffect, useState } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ModalNome({
  isModalOpen,
  setIsModalOpen,
  isModalNomeChange,
}) {
  const [nome, setNome] = useState("");

  useEffect(() => {
    setNome(localStorage.getItem("nome"));

    if (!localStorage.getItem("nome")) setIsModalOpen(true);
  }, []);
  const handleClickOutside = (event) => {
    if (event.target.id === "modalNome") {
      handleClose();
    }
  };

  function handleClose() {
    setNome(localStorage.getItem("nome"));
    setIsModalOpen(false);
    window.location.reload();
  }

  function handleChange() {
    localStorage.setItem("nome", nome);
    handleClose();
  }

  return (
    <>
      <div
        id="modalNome"
        className={`fixed inset-0 flex items-center justify-center z-50 ${
          isModalOpen ? "block" : "hidden"
        }`}
        onClick={handleClickOutside}
      >
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50"></div>

        <div className="bg-white p-8 rounded-xl shadow-xl max-w-xl transform transition duration-300 hover:scale-105 m-3">
        
        {nome != "" ? (
        <button type="button" className="absolute top-0 right-0 p-3 py-2 text-xl hover:text-red-600 " onClick={handleClose}> <FontAwesomeIcon icon={faClose} /></button> ) : null }
          
          <h2 className="text-lg font-bold mb-4"></h2>

          <h2 className="font-bold text-3xl md:text-5xl text-center mb-4">
            Informe seu nome <br />
            <p className="font-normal text-sm md:text-base">
              Ele será usado para realizar as reservas e deixar os recados
            </p>
          </h2>

          <div className="flex flex-col mb-4">
            {/* <label className="">Se:</label> */}
            <input
              type="text"
              name="nome"
              id="nome"
              placeholder="Digite algo especial"
              className="border border-gray-200 p-2 rounded-xl"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <div className="">
              <p className="text-red-500 text-sm">Use nome e sobrenome</p>
              <p className="text-red-500 text-sm">
                Seu nome será usado para identificar suas ações no site.
              </p>
              <p className="text-red-500 text-sm">
                Se alterar posteriormente, perderá a relação com as reservas
                feitas
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleChange}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Continuar
          </button>
        </div>
      </div>
    </>
  );
}
