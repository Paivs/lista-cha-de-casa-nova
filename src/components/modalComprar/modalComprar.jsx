"use client";

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";


export default function ModalComprar({
  presente,
  isModalOpen,
  setIsModalOpen,
}) {
  const [step, setStep] = useState(0);
  const [nome, setNome] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleClickOutside = (event) => {
    if (event.target.id === "modalComprar") {
      handleClose();
    }
  };

  function handleClose() {
      setStep(0);
      setNome("");
      setMensagem("");
      setIsModalOpen(false);
  };

  function handleSalvar(){

    localStorage.setItem("nome", nome);

    const presentes = JSON.parse(localStorage.getItem("presentes")) || [];
    const novoPresente = [...presentes, presente];
    localStorage.setItem("presentes", JSON.stringify(novoPresente));
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
        {step === 0 ? (
          <>
            <div className="bg-white p-8 rounded-xl shadow-xl max-w-xl transform transition duration-300 hover:scale-105 m-1">
                <button type="button" className="absolute top-0 right-0 p-3 py-2 text-xl hover:text-red-600 " onClick={handleClose}> <FontAwesomeIcon icon={faClose} /></button>
              <h2 className="text-lg font-bold mb-4">
                Vamos reservar seu presente!
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
                <p className="text-sm text-gray-300">
                  Assim que reservar não é possível retornar o presente, <br />
                  ele ficará indisponível para as outras pessoas
                </p>
              </div>

              <div className="flex flex-col mb-4">
                <label className="">Se quiser, deixe uma mensagem:</label>
                <input
                  type="text"
                  name="mensagem"
                  id=""
                  placeholder="Digite algo especial"
                  className="border border-gray-200 p-2 rounded-xl"
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                />
              </div>

              <button
                type="button"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                onClick={() => {
                  if (nome === "") {
                    alert("Por favor, preencha as informações");
                    return;
                  }

                  setStep(1);

                  handleSalvar();
                }}
              >
                Reservar
              </button>
            </div>
          </>
        ) : null}

        {step === 1 ? (
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-xl transform transition duration-300 hover:scale-105 m-1">
            <button type="button" className="absolute top-0 right-0 p-3 py-2 text-xl hover:text-red-600 " onClick={handleClose}> <FontAwesomeIcon icon={faClose} /></button>
            <h2 className="text-lg font-bold mb-4">{presente.nome}</h2>

            <h2 className="font-bold text-xl text-center mb-4">
              Você pode comprar o produto ou <br /> enviar o valor diretamente!
            </h2>

            <div className="w-full flex flex-col justify-start">
              <div className="w-full flex flex-col items-center justify-center">
                <img
                  src={`/produtos/${presente.imagem}.jpg`}
                  alt={presente.nome}
                  className="w-64 h-auto"
                />
              </div>
              <p>
                Valor: <span className="font-bold"> R$ {presente.preco}</span>
              </p>
            </div>

            <p className="my-4">
              Chave PIX (NuBank):{" "}
              <span className="font-bold">gustavo.paiva.gp1@gmail.com</span>
            </p>

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
        ) : null}
      </div>
    </>
  );
}
