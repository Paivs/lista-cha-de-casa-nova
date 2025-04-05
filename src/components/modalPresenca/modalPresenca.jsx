"use client";

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import PixCopia from "../pixCopia/pixCopia";

export default function ModalPresenca({
  presente,
  isModalOpen,
  setIsModalOpen,
  reload,
}) {
  const [step, setStep] = useState(0);
  const [nome, setNome] = useState("");

  const handleClickOutside = (event) => {
    if (event.target.id === "modalPresenca") {
      handleClose();
    }
  };

  useEffect(() => {
    setNome(localStorage.getItem("nome"));
  }, []);

  useEffect(() => {
    const nomeLocalStoraged = localStorage.getItem("nome");
    setNome(nomeLocalStoraged ? nomeLocalStoraged : "");
  }, [isModalOpen]);

  function handleClose() {
    setStep(0);
    setNome("");

    reload()

    setIsModalOpen(false);
  }

  async function handleConfirma(){
    const response = await fetch('/api/postPresenca', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome: nome }),
    });
    
    if (!response.ok) {
      alert("Erro: ", nome)
      throw new Error('Erro ao fazer presenca');
    }

    localStorage.setItem("presenca", "reservado")

    handleClose();
  }

  return (
    <>
      <div
        id="modalPresenca"
        className={`fixed inset-0 flex items-center justify-center z-50 ${
          isModalOpen ? "block" : "hidden"
        }`}
        onClick={handleClickOutside}
      >
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50"></div>
        {step === 0 ? (
          <>
            <div className="bg-white p-8 rounded-xl shadow-xl max-w-xl transform transition duration-300 hover:scale-105 m-3">
              <button
                type="button"
                className="absolute top-0 right-0 p-3 py-2 text-xl hover:text-red-600 "
                onClick={handleClose}
              >
                {" "}
                <FontAwesomeIcon icon={faClose} />
              </button>
              <h2 className="text-lg font-bold mb-4">Confirmando presença</h2>

              <div className="flex flex-col mb-4">
                <p>
                  Estamos contando os dias para o nosso Chá de Cozinha! Queremos
                  muito compartilhar esse momento especial com você. Por favor,
                  confirme sua presença para organizarmos tudo com carinho
                </p>

                <div className="flex w-full items-center justify-center">
                  <img
                    src="\produtos\amor.jpg"
                    alt=""
                    className="max-w-[200px]"
                  />
                </div>
              </div>

              <button
                type="button"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                onClick={() => {
                  setStep(1);

                  handleConfirma();
                }}
              >
                Confirmando como <span className="font-bold">{nome}</span>
              </button>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
