"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCircleXmark,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import "./item.css";

export default function ItemAdmin({
  presente,
  onButtonClick,
  isMine,
  onButtonClickAndComprado,
  reload,
  onTitleClick,
}) {
  function handleReset() {

    const confirmRemove = window.confirm(
      `Tem certeza que deseja limpar as informações de reserva do presente ${presente.titulo}?`
    );
    if (!confirmRemove) return;


    fetch(`/api/admin/resetPresente?id=${presente.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: presente.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          reload();
        }
      })
      .catch((error) => {
        alert("Erro ao limpar as reservas do presente");
      });
  }

  function handleRemove() {
    const confirmRemove = window.confirm(
      `Tem certeza que deseja remover o presente ${presente.titulo}?`
    );
    if (!confirmRemove) return;

    fetch(`/api/admin/removePresente?id=${presente.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: presente.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          reload();
        }
      })
      .catch((error) => {
        alert("Erro ao remover presente");
      });
  }

  return (
    <div
      className={`flex flex-col shadow-md justify-between border-gray-200 border p-2`}
    >
      <div className="w-full flex items-center justify-center">
        <img
          src={`produtos/${presente.imagem}`}
          alt={presente.titulo}
          className="w-64 h-64 object-cover object-center"
        />
      </div>

      <button type="button" className="text-left" onClick={onTitleClick}>
        <h2 className="text-xl font-bold text-wrap overflow-hidden text-ellipsis whitespace-nowrap max-lines-2">
          {presente.titulo}
        </h2>
      </button>
      <p className="text-base text-wrap-descricao">{presente.descricao}</p>

      <div className="w-full mt-4">
        <div className="inline">
          <p>Preço:</p>
          <p className="font-bold text-2xl">{presente.preco}</p>
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
          <button type="button">
            <a
              href={presente.link}
              target="_blank"
              className="grow inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Acessar a loja
            </a>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="grow inline-block bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition"
          >
            Reset
          </button>

          <button
            type="button"
            onClick={handleRemove}
            className="grow inline-block bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
          >
            Remover
          </button>

        </div>
      </div>
    </div>
  );
}
