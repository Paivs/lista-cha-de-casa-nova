"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCircleXmark,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import ModalComprar from "../modalComprar/modalComprar";
import "./item.css";

export default function Item({
  presente,
  onButtonClick,
  isMine,
  onButtonClickAndComprado,
  onTitleClick
}) {
  return (
    <div
      className={`flex flex-col shadow-md justify-between border-gray-200 border p-2 ${
        presente.estado === "reservado" && !isMine
          ? "bg-gray-300 opacity-80"
          : ""
      }`}
    >
      <div className="w-full flex items-center justify-center">
        <img
          src={`produtos/${presente.imagem}`}
          alt={presente.titulo}
          className="w-64 h-64 object-cover object-center"
        />
      </div>

      <button type="button" className="text-left" onClick={onTitleClick}>
        <h2 className="text-xl font-bold">
          {presente.titulo}
        </h2>
      </button>
      <p className="text-base text-wrap-descricao">{presente.descricao}</p>

      <div className="w-full mt-4">
        <div className="inline">
          <p>Preço:</p>
          <p className="font-bold text-2xl">{presente.preco}</p>
        </div>

        <button
          type="button"
          className={`relative w-full flex gap-2 items-center justify-center ${
            presente.estado === "reservado" && !isMine
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "text-blue-500 bg-white p-1 border border-[#eceef1] h-auto text-center text-xl"
          }`}
          onClick={() => {
            if (presente.estado === "reservado" && isMine)
              onButtonClickAndComprado();
            if (presente.estado === "reservado" && !isMine) return;
            if (presente.estado === "disponivel") onButtonClick();
          }}
        >
          {presente.estado === "disponivel" ? (
            <>
              <FontAwesomeIcon icon={faCheck} className="w-auto h-8" />
              Selecionar
            </>
          ) : null}
          {presente.estado === "reservado" && !isMine ? (
            <>
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="w-auto h-8 p-1"
              />
              Já reservado
            </>
          ) : null}

          {presente.estado === "reservado" && isMine ? (
            <>
              <FontAwesomeIcon icon={faInfo} className="w-auto h-6" />
              Informações
            </>
          ) : null}

          {isMine && (
            <div className="absolute -top-8 -right-2 translate-x-2 -translate-y-2 p-2 py-4 text-center rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
              <p className="text-sm text-white font-bold">
                EU <br /> COMPREI!
              </p>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
