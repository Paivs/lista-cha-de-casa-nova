"use client";

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import PixCopia from "../../../components/pixCopia/pixCopia";

export default function modalItemAdmin({
  presente,
  isModalOpen,
  setIsModalOpen,
  reload,
}) {
  const [step, setStep] = useState(0);
  const [nome, setNome] = useState("");
  const [alertou, setAlertou] = useState(false);
  const [primeiraVez, setPrimeiraVez] = useState(false);
  const [nomeLocal, setNomeLocal] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleClickOutside = (event) => {
    if (event.target.id === "modalComprar") {
      handleClose();
    }
  };

  useEffect(() => {
    setNome(localStorage.getItem("nome"));
    setNomeLocal(localStorage.getItem("nome"));
  }, []);

  useEffect(() => {
    const nomeLocalStoraged = localStorage.getItem("nome");
    setNome(nomeLocalStoraged ? nomeLocalStoraged : "");
    setNomeLocal(nomeLocalStoraged ? nomeLocalStoraged : "");
  }, [isModalOpen]);

  function handleClose() {
    setStep(0);

    setAlertou(false);
    setNome("");
    setMensagem("");
    if (nomeLocal != nome) setPrimeiraVez(false);

    reload();

    setIsModalOpen(false);
  }

  async function saveOnAPI() {
    try {
      const response = await fetch("/api/reservePresente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: presente.id,
          estado: "reservado",
          nomePreseteador: nome,
          recado: mensagem,
        }),
      });

      if (!response.ok) {
        alert("Erro ao reservar: ", presente.nome);
        throw new Error("Erro ao reservar presente");
      }

      // Handle success response
    } catch (error) {
      // setError(error.message);
    }
  }

  function handleSalvar() {
    saveOnAPI()
      .then(() => {
        localStorage.setItem("nome", nome);

        const presentes = JSON.parse(localStorage.getItem("presentes")) || [];
        const novoPresente = [...presentes, presente];
        localStorage.setItem("presentes", JSON.stringify(novoPresente));
      })
      .catch((error) => {
        return;
      });
  }

  function handleReset(){
    fetch(`/api/admin/removePresente?id=${presente.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          handleClose();
          reload();
        }
      })
      .catch(error => {
        alert("Erro ao remover presente");
      });
  }

  function handleRemove(){

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
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-xl transform transition duration-300 hover:scale-105 m-1">
          <button
            type="button"
            className="absolute top-0 right-0 p-3 py-2 text-xl hover:text-red-600 "
            onClick={handleClose}
          >
            {" "}
            <FontAwesomeIcon icon={faClose} />
          </button>
          <h2 className="text-lg font-bold mb-4">{presente.titulo}</h2>

          <div className="w-full flex flex-col justify-start">
            <div className="w-full flex flex-col items-center justify-center">
              <img
                src={`/produtos/${presente.imagem}`}
                alt={presente.nome}
                className="w-64 h-auto"
              />
            </div>
            <p>{presente.descricao}</p>
            <p>
              Valor: <span className="font-bold">{presente.preco}</span>
            </p>
          </div>

          {presente.estado === "reservado" ? (
            <div className="my-4">
              <p>
                Nome do Presenteador:{" "}
                <span className="font-bold">{presente.nomePresenteador}</span>
              </p>
              <p>
                Recado:{" "}
                {!presente.recado ? (
                  <span className="italic text-red-600">sem recado</span>
                ) : (
                  <span className="italic">{presente.recado}</span>
                )}
              </p>
            </div>
          ) : (
            <div className="my-4"></div>
          )}

          <div className="flex flex-row gap-2 flex-wrap mb-4">
            <button type="button mt-4" onClick={handleReset} className="inline-block bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition">
                Reset
            </button>

            <button type="button mt-4" onClick={handleRemove} className="inline-block bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition">
                Remover
            </button>
          </div>

          <button type="button mt-4">
            <a
              href={presente.link}
              target="_blank"
              className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Acessar a loja
            </a>
          </button>
        </div>
      </div>
    </>
  );
}
