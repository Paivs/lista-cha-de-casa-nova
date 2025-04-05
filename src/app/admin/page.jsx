"use client";

import { useState, useEffect } from "react";
import ItemAdmin from "./ItemAdmin/itemAdmin";
import ModalItemAdmin from "./modalItemAdmin/modalItemAdmin";
import Recado from "./RecadoAdmin/recado";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBill,
  faShare,
  faGift,
  faWalkieTalkie,
  faPlus,
  faQuestion,
  faInfo,
  faArrowsSpin,
  faMinus,
  faCheckToSlot,
} from "@fortawesome/free-solid-svg-icons";
import AddItem from "./AddItem/AddItem";

export default function admin() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [section, setSection] = useState("presentes");

  const [showAddPresente, setShowAddPresente] = useState(false);

  const [presencas, setPresencas] = useState({});

  const [presente, setPresente] = useState({});

  const [presentesReservados, setPresentesReservados] = useState([]);
  const [presentesDisponiveis, setPresentesDisponiveis] = useState([]);
  const [recados, setRecados] = useState([]);

  const [nome, setNome] = useState("");

  async function fetchPresentes() {
    try {
      const response = await fetch("/api/admin/getAllPresentes");
      if (!response.ok) {
        throw new Error("Erro ao buscar presentes");
      }
      const data = await response.json();
      const {
        presentesReservados: reservados,
        presentesDisponiveis: disponiveis,
      } = data.reduce(
        (acc, presente) => {
          if (presente.estado === "reservado") {
            acc.presentesReservados.push(presente);
          } else {
            acc.presentesDisponiveis.push(presente);
          }
          return acc;
        },
        { presentesReservados: [], presentesDisponiveis: [] }
      );
      setPresentesReservados(reservados);
      setPresentesDisponiveis(disponiveis);
    } catch (error) {
      // setError(error.message);
    }
  }

  async function fetchRecados() {
    try {
      const response = await fetch("/api/admin/getAllRecados");
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

  function handleOpenModal(presente) {
    setPresente(presente);
    setIsModalOpen(true);
  }

  function fetchAll() {
    fetchPresentes();
    fetchRecados();
    fetchNome();
  }

  async function fetchPresencas(){
    try {
      const response = await fetch("/api/admin/getPresenca");
      if (!response.ok) {
        throw new Error("Erro ao buscar recados");
      }
      const data = await response.json();
      setPresencas(data);
    } catch (error) {
      // setError(error.message);
    }
  }

  useEffect(() => {
    fetchPresentes();
    fetchRecados();
    fetchPresencas();

    fetchNome();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Senha incorreta");
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <div className="w-screen h-screen flex flex-col items-center justify-center">
          <div className="flex flex-col w-full text-center items-center justify-center container mx-auto">
            <img
              src="eu.jpg"
              alt="Logo Lívia e Gustavo"
              className="w-auto h-40 rounded-full"
            />
            <div className="text-center px-2 text-xl md:text-2xl font-bold text-[#374151]">
              <h2 className="">Chá de casa nova da Lívia e do Gustavo</h2>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-8">
            <label>
              Senha:
              <input
                type="password"
                className="ms-2 shadow-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-blue-400 text-white font-bold rounded-full"
            >
              Entrar
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <ModalItemAdmin
        presente={presente}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        reload={fetchAll}
      />

      {nome && (
        <div className=" w-full flex flex-col items-center justify-center gap-2 mt-20">
          <h2 className="text-5xl text-center">
            {new Date().getHours() < 12
              ? "Bom dia"
              : new Date().getHours() < 18
              ? "Boa tarde"
              : "Boa noite"}
            , {nome}
          </h2>
        </div>
      )}

      <section className="container mx-auto px-3 my-4">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="flex flex-col md:flex-row gap-4">
            <button
              type="button"
              className={`flex items-center justify-center w-full md:w-fit cursor-pointer bg-white px-4 py-2 border border-[#eceef1] h-auto text-center text-xl shadow-md ${
                section === "presentes" ? "bg-[#f1f1f1]" : ""
              }`}
              onClick={() => {
                setSection("presentes");
                fetchPresentes();
              }}
            >
              <FontAwesomeIcon
                className="inline w-auto h-8 me-2"
                icon={faGift}
              />
              Presentes
            </button>

            <button
              type="button"
              className={`flex items-center justify-center w-full md:w-fit cursor-pointer bg-white px-4 py-2 border border-[#eceef1] h-auto text-center text-xl shadow-md ${
                section === "recados" ? "bg-[#f1f1f1]" : ""
              }`}
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
            
            <button
              type="button"
              className={`flex items-center justify-center w-full md:w-fit cursor-pointer bg-white px-4 py-2 border border-[#eceef1] h-auto text-center text-xl shadow-md ${
                section === "presenca" ? "bg-[#f1f1f1]" : ""
              }`}
              onClick={() => {
                setSection("presenca");
                fetchPresencas();
              }}
            >
              <FontAwesomeIcon
                className="inline w-auto h-8 me-2"
                icon={faCheckToSlot}
              />
              Presenca
            </button>
          </div>

          {section === "presentes" && (
            <>
              <div className="my-4">
                <h2 className="text-center px-2 text-xl md:text-2xl font-bold text-[#374151]">
                  Adicionar Presente
                  <button
                    type="button"
                    className="ms-2"
                    onClick={() => setShowAddPresente(!showAddPresente)}
                  >
                    {!showAddPresente && (
                      <FontAwesomeIcon
                        className="inline w-auto h-6 me-2 bg-black text-white rounded-full px-2 py-1"
                        icon={faPlus}
                      />
                    )}
                    {showAddPresente && (
                      <FontAwesomeIcon
                        className="inline w-auto h-6 me-2 bg-black text-white rounded-full px-2 py-1"
                        icon={faMinus}
                      />
                    )}


                  </button>
                </h2>

                {showAddPresente && <AddItem reload={fetchAll} />}
              </div>

              <h2 className="text-center px-2 text-xl md:text-2xl font-bold text-[#374151]">
                Presentes Reservados
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 gap-3">
                {presentesReservados.map((presente, index) => (
                  <ItemAdmin
                    key={index}
                    reload={fetchAll}
                    presente={presente}
                    isMine={presente.nomePresenteador === nome}
                    onButtonClick={() => handleOpenModal(presente)}
                    onButtonClickAndComprado={() =>
                      handleOpenModalItem(presente)
                    }
                    onTitleClick={() => handleOpenModalItemPrev(presente)}
                  />
                ))}

                {presentesReservados.length <= 0 && (
                  <>
                    <div className="w-full items-center flex justify-center">
                      <p>Nenhum presente reservado</p>
                    </div>
                  </>
                )}
              </div>

              <h2 className="mt-4 text-center px-2 text-xl md:text-2xl font-bold text-[#374151]">
                Presentes disponíveis
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 gap-3">
                {presentesDisponiveis.map((presente, index) => (
                  <ItemAdmin
                    key={index}
                    reload={fetchAll}
                    presente={presente}
                    isMine={presente.nomePresenteador === nome}
                    onButtonClick={() => handleOpenModal(presente)}
                    onButtonClickAndComprado={() =>
                      handleOpenModalItem(presente)
                    }
                    onTitleClick={() => handleOpenModalItemPrev(presente)}
                  />
                ))}

                {presentesDisponiveis.length <= 0 && (
                  <>
                    <div className="w-full items-center flex justify-center">
                      <p>Nenhum presente disponível</p>
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          {section === "recados" && (
            <>
              <div className="flex flex-row flex-wrap gap-2 overflow-hidden my-4 mb-[25vh]">
                {recados.map((recado, index) => (
                  <Recado
                    key={index}
                    mensagem={recado.recado}
                    nome={recado.nome}
                  />
                ))}
              </div>
            </>
          )}

          {section === "presenca" && (
            <>
              <div className="flex flex-row flex-wrap gap-2 overflow-hidden my-4 mb-[25vh]">
                {presencas.map((presenca, index) => (
                  <div
                  key={index}
                  className={`flex flex-col grow shadow-md justify-between border-gray-200 border p-3`}
                >
                  <p className="text-xl text-wrap min-w-48">- {presenca.nome}</p>
                  <p className="text-xl font-bold">Confirmado</p>
                </div>
                ))}
              </div>
            </>
          )}


        </div>
      </section>

      <div className="px-0 md:px-2 my-8">
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
