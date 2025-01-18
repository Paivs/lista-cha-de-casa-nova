"use client";

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function ModalRecado({ isModalOpen, setIsModalOpen, reload }) {
  const [nome, setNome] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleClickOutside = (event) => {
    if (event.target.id === "modalComprar") {
      handleClose();
    }
  };

  function handleClose() {
    setNome("");
    setMensagem("");
    setIsModalOpen(false);
  }

  async function saveOnAPI() {
    try {
      const response = await fetch("/api/postRecado", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome: nome, recado: mensagem }),
      });

      if (!response.ok) {
        if (nome) alert(`Desculpe ${nome}, seu recado não pode ser salvo!`);
        else alert(`Desculpe, seu recado não pode ser salvo!`);

        throw new Error("Erro ao reservar presente");
      }

      // Handle success response
    } catch (error) {
      if (nome) alert(`Desculpe ${nome}, seu recado não pode ser salvo!`);
      else alert(`Desculpe, seu recado não pode ser salvo!`);
    }
  }

  function handleSalvar() {
    saveOnAPI().then(() => {
      reload()
      handleClose();
    }).catch((error) => {
      return;
    });
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

        <div className="bg-white p-8 rounded-xl shadow-xl max-w-xl transform transition duration-300 hover:scale-105 m-3">
          <button
            type="button"
            className="absolute top-0 right-0 p-3 py-2 text-xl hover:text-red-600 "
            onClick={handleClose}
          >
            {" "}
            <FontAwesomeIcon icon={faClose} />
          </button>
          <h2 className="text-lg font-bold mb-4">
            Deixe uma mensagem!
          </h2>

          <div className="flex flex-col mb-4">
            <label className="">Seu nome:</label>
            <input
              type="text"
              name="nome"
              id=""
              placeholder="Digite seu nome"
              className="border border-gray-200 p-2 rounded-xl"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="">Mensagem:</label>
            <textarea
              name="mensagem"
              id=""
              placeholder="Digite algo especial"
              className="border border-gray-200 p-2 rounded-xl resize-none"
              rows={4}
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
            ></textarea>
          </div>

          <button
            type="button"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            onClick={() => {
              if (nome === "" || mensagem === "") {
                alert("Por favor, preencha as informações");
                return;
              }


              handleSalvar();
            }}
          >
            Enviar
          </button>
        </div>
      </div>
    </>
  );
}
