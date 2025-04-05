"use client";

import { useState } from "react";

export default function AddItem({ reload }) {
  const [presente, setPresente] = useState({
    id: null,
    titulo: "",
    descricao: "",
    preco: "",
    link: "",
    imagem: "",
    estado: "disponivel",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Dados enviados:", presente);

    try {
      const response = await fetch("/api/admin/addPresente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...presente,
          preco: `R$ ${presente.preco}`,
          imagem: presente.imagem.replace("/produtos/", ""),
        }),
      });

      if (response.ok) {
        reload();
        alert("Produto foi adicionado!");
      }

      // Handle success response
    } catch (error) {
      alert(`Desculpe, seu presente não pode ser salvo!`);
    }

    setPresente({
      id: null,
      titulo: "",
      descricao: "",
      preco: "",
      link: "",
      imagem: "",
      estado: "disponivel",
    });
  }

  return (
    <div
      className={`flex flex-col lg:flex-row shadow-md justify-between border-gray-200 border p-2 gap-2`}
    >
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="titulo" className="block mb-2 text-sm">
          Nome:
          <input
            type="text"
            name="titulo"
            id="titulo"
            value={presente.titulo}
            onChange={(e) =>
              setPresente({ ...presente, titulo: e.target.value })
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </label>

        <label htmlFor="titulo" className="block mb-2 text-sm">
          Descrição:
          <input
            type="text"
            name="titulo"
            id="titulo"
            value={presente.descricao}
            onChange={(e) =>
              setPresente({ ...presente, descricao: e.target.value })
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </label>

        <label htmlFor="titulo" className="block mb-2 text-sm">
          Preço:
          <input
            type="text"
            inputMode="numeric"
            name="preco"
            id="preco"
            value={presente.preco}
            onChange={(e) => {
              const sanitizeInput = (value) => value.replace(/[^0-9.,]/g, "");
              setPresente({
                ...presente,
                preco: sanitizeInput(e.target.value),
              });
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </label>

        <label htmlFor="titulo" className="block mb-2 text-sm">
          Link:
          <input
            type="text"
            name="preco"
            id="preco"
            value={presente.link}
            onChange={(e) => setPresente({ ...presente, link: e.target.value })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-nowrap text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </label>

        <label htmlFor="titulo" className="block mb-2 text-sm">
          Imagem:
          <input
            type="file"
            name="imagem"
            id="imagem"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;

              const formData = new FormData();
              formData.append("file", file); // Alterado para "file"

              fetch("/api/admin/uploadImagem", {
                method: "POST",
                body: formData,
              })
                .then((res) => res.json())
                .then((data) => {
                  setPresente((prev) => ({ ...prev, imagem: data.url }));
                })
                .catch((error) => {
                  console.error(error);
                });
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-nowrap text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </label>

        <button
          type="submit"
          className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Salvar
        </button>
      </form>

      {/* preview */}
      <div
        className={`flex flex-col shadow-md justify-between border-gray-200 border p-2 lg:max-w-[20vw]`}
      >
        <div className="w-full flex items-center justify-center">
          <img
            src={
              presente.imagem
                ? presente.imagem
                : "https://placehold.co/600x400/png"
            }
            alt={presente.titulo}
            className="w-64 h-64 object-cover object-center"
          />
        </div>

        <button type="button" className="text-left">
          <h2 className="text-xl font-bold text-wrap overflow-hidden text-ellipsis whitespace-nowrap max-lines-2 min-h-7">
            {presente.titulo}
          </h2>
        </button>
        <p className="text-base text-wrap-descricao min-h-6">
          {presente.descricao}
        </p>

        <div className="w-full mt-4">
          <div className="">
            <p>Preço:</p>
            <p className="font-bold text-2xl min-h-8">{presente.preco}</p>
          </div>
        </div>

        <div className="flex items-start justify-start">
          <button type="button">
            <a
              href={presente.link}
              target="_blank"
              className="grow inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Acessar a loja
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}
