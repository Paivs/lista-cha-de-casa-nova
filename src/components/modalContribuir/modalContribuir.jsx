"use client";

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function ModalContribuir({
  isModalOpen,
  setIsModalOpen,
}){

    function handleClose() {
        setIsModalOpen(false);
    };

    return(
    <>
      <div
        id="modalComprar"
        className={`fixed inset-0 flex items-center justify-center z-50 ${
          isModalOpen ? "block" : "hidden"
        }`}
      >
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50"></div>
            <div className="bg-white p-8 rounded-xl shadow-xl max-w-xl transform transition duration-300 hover:scale-105 m-1">
                <button type="button" className="absolute top-0 right-0 p-3 py-2 text-xl hover:text-red-600 " onClick={handleClose}> <FontAwesomeIcon icon={faClose} /></button>
              <h2 className="text-lg font-bold mb-4">
                Você pode contribuir com qualquer valor!
              </h2>

              <img src="joinha.png" alt="" />

              <p className="my-4">
              Chave PIX (NuBank):{" "}
              <span className="font-bold">gustavo.paiva.gp1@gmail.com</span>


            </p>

              <button
                type="button"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                onClick={() => { handleClose() }}
              >
                Entendido
              </button>
            </div>
        </div>  
    </>
    )
}