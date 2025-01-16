"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBill,
  faShare,
  faGift,
  faWalkieTalkie,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Item from "@/components/Item/item";
import Recado from "@/components/Recado/recado";
// import presentes from "../../public/base.json";
import ModalComprar from "@/components/modalComprar/modalComprar";
import { useState, useEffect } from "react";
import ModalContribuir from "@/components/modalContribuir/modalContribuir";
import ModalRecado from "@/components/modalRecado/modalRecado";

export default function Home() {
  const [presente, setPresente] = useState({});
  const [presentes, setPresentes] = useState([]);
  const [recados, setRecados] = useState([]);

  const [nome, setNome] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalContribuirOpen, setIsModalContribuirOpen] = useState(false);
  const [isModalRecadoOpen, setIsModalRecadoOpen] = useState(false);

  const [section, setSection] = useState("presentes");

  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleMaxPriceChange = (e) => setMaxPrice(e.target.value);

  async function fetchPresentes() {
    try {
      const response = await fetch("/api/getAllPresentes");
      if (!response.ok) {
        throw new Error("Erro ao buscar presentes");
      }
      const data = await response.json();
      setPresentes(data);
    } catch (error) {
      // setError(error.message);
    }
  }

  async function fetchRecados() {
    try {
      const response = await fetch("/api/getAllRecados");
      if (!response.ok) {
        throw new Error("Erro ao buscar recados");
      }
      const data = await response.json();
      setRecados(data);
    } catch (error) {
      // setError(error.message);
    }
  }

  async function fetchNome() {
    setNome(localStorage.getItem("nome"));
    console.log("seu nome é: ", localStorage.getItem("nome"));
  }

  function fetchAll(){
    fetchPresentes();
    fetchRecados();
    fetchNome();
  }

  useEffect(() => {
    fetchPresentes();
    fetchRecados();

    fetchNome();
  }, []);

  const filteredPresentes = presentes.filter((presente) => {
    const matchesSearch = presente.titulo
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPrice =
      maxPrice === "" || parseFloat(presente.preco) <= parseFloat(maxPrice);
    return matchesSearch && matchesPrice;
  });

  function handleOpenModal(presente) {
    console.log("cheguei");
    setPresente(presente);
    setIsModalOpen(true);
  }

  return (
    <>
      <ModalComprar
        presente={presente}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        reload={fetchAll}
        />

      <ModalContribuir
        isModalOpen={isModalContribuirOpen}
        setIsModalOpen={setIsModalContribuirOpen}
        />

      <ModalRecado
        isModalOpen={isModalRecadoOpen}
        setIsModalOpen={setIsModalRecadoOpen}
        reload={fetchAll}
      />

      <div className="flex flex-col w-full text-center items-center justify-center pt-16 container mx-auto">
        <img
          src="eu.jpg"
          alt="Logo Lívia e Gustavo"
          className="w-auto h-40 rounded-full"
        />
        <h1 className="text-center px-2 text-xl md:text-2xl font-bold text-[#374151]">
          Chá de casa nova da Lívia e do Gustavo
        </h1>

        <div className="w-full flex flex-col items-center justify-center gap-2 mt-2">
          <button
            type="button"
            className="w-1/2 cursor-pointer bg-white p-1 border border-[#eceef1] h-auto text-center text-md md:text-xl flex items-center justify-center shadow-md"
            onClick={() => setIsModalContribuirOpen(true)}
          >
            <FontAwesomeIcon
              className="inline w-auto h-5 md:h-8 me-2"
              icon={faMoneyBill}
            />
            Contribuir
          </button>

          <button
            type="button"
            className="w-1/2  cursor-pointer bg-white p-1 border border-[#eceef1] h-auto text-center text-md md:text-xl flex items-center justify-center shadow-md"
            onClick={() => {
              navigator.clipboard.writeText("livs-e-gu.com.br");
              alert("Link copiado!");
            }}
          >
            <FontAwesomeIcon
              className="inline w-auto h-5 md:h-8 me-2"
              icon={faShare}
            />
            Compartilhar
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center justify-center w-full px-1 md:px-2">
        <div className="flex flex-col gap-3 bg-[#ffffff] w-full md:w-2/3 p-4 shadow-sm">
          <p className="text-lg md:text-xl font-light">
            Nesse nosso vigésimo primeiro aniversário decidimos montar nossa
            própria casinha. Ficamos felizes e aguardamos sua presença e, se
            possível, uma contribuição para nosso novo lar!
          </p>

          <div className="pb-2 text-center">
            <h2 className="text-2xl font-bold">
              Rua Araguaia, 233 - Santo André, SP
            </h2>
            <p className="text-xl font-light">Sábado, 31 de maio de 2025</p>
            <p className="text-xl font-light">14:00</p>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-3 my-4">
        <div className="flex flex-col md:flex-row gap-4">
          <button
            type="button"
            className="flex items-center justify-center w-full md:w-fit cursor-pointer bg-white px-4 py-2 border border-[#eceef1] h-auto text-center text-xl shadow-md"
            onClick={() => {
              setSection("presentes");
              fetchPresentes()
            }}
          >
            <FontAwesomeIcon className="inline w-auto h-8 me-2" icon={faGift} />
            Presentes
          </button>

          <button
            type="button"
            className="flex items-center justify-center w-full md:w-fit cursor-pointer bg-white px-4 py-2 border border-[#eceef1] h-auto text-center text-xl shadow-md"
            onClick={() => {
              setSection("recados");
              fetchRecados();
            }}
          >
            <FontAwesomeIcon
              className="inline w-auto h-8 me-2"
              icon={faWalkieTalkie}
            />
            Recados
          </button>
        </div>

        {section === "presentes" ? (
          <div className="w-full flex flex-col items-center justify-center">
            <div className="mb-4 flex flex-col sm:flex-row w-full mt-2">
              <input
                type="text"
                placeholder="Pesquisar..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="border p-2 mb-2 sm:mb-0 sm:mr-2 grow shadow-sm"
              />
              <input
                type="number"
                placeholder="Preço máximo"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                className="border p-2 shadow-sm"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 gap-3">
              {filteredPresentes.map((presente, index) => (
                  <Item
                    key={index}
                    presente={presente}
                    isMine={presente.nomePresenteador === nome}
                    onButtonClick={() => handleOpenModal(presente)}
                  />
              ))}
            </div>
          </div>
        ) : null}

        {section === "recados" ? (
          <>
            <div className="md:hidden bg-[#878d98] h-1 w-full rounded-full my-6"></div>

            <div className="w-full flex justify-end item-center container mx-auto ">
              <button
                type="button"
                className="flex mb-3 items-center justify-center w-full md:w-fit cursor-pointer bg-white px-4 py-2 border border-[#eceef1] h-auto text-center text-xl shadow-md"
                onClick={() => setIsModalRecadoOpen(true)}
              >
                <FontAwesomeIcon
                  className="inline w-auto h-8 me-2"
                  icon={faPlus}
                />
                Adicionar recado
              </button>
            </div>

            <div className="flex flex-row flex-wrap gap-2 overflow-hidden mb-[25vh]">
              {recados.map((recado, index) => (
                <Recado
                  key={index}
                  mensagem={recado.recado}
                  nome={recado.nome}
                />
              ))}
            </div>
          </>
        ) : null}
      </section>

      <div className="mx-2 my-8">
        <p className="text-center text-lg font-light">
          Desenvolvida por{" "}
          <a
            href="https://github.com/paivs"
            className="text-blue-500 hover:underline"
          >
            Gustavo Paiva
          </a>
        </p>
      </div>
    </>
  );
}
