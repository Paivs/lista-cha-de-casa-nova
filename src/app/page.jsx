"use client";

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
  faCheckToSlot,
} from "@fortawesome/free-solid-svg-icons";
import Item from "@/components/Item/item";
import Recado from "@/components/Recado/recado";
// import presentes from "../../public/base.json";
import ModalComprar from "@/components/modalComprar/modalComprar";
import { useState, useEffect } from "react";
import ModalContribuir from "@/components/modalContribuir/modalContribuir";
import ModalRecado from "@/components/modalRecado/modalRecado";
import ModalItem from "@/components/modalItem/modalItem";
import ModalItemPrev from "@/components/modalItemPrev/modalItemPrev";
import Faq from "@/components/faq/faq";
import ModalNome from "@/components/modalNome/modalNome";
import Splash from "@/components/splash/splash";
import ModalPresenca from "@/components/modalPresenca/modalPresenca";

export default function Home() {
  const [presente, setPresente] = useState({});

  const [presentes, setPresentes] = useState([]);
  const [recados, setRecados] = useState([]);

  const [nome, setNome] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalContribuirOpen, setIsModalContribuirOpen] = useState(false);
  const [isModalRecadoOpen, setIsModalRecadoOpen] = useState(false);
  const [isModalItem, setIsModalItem] = useState(false);
  const [isModalItemPrev, setIsModalItemPrev] = useState(false);

  const [isModalPresenca, setIsModalPresenca] = useState(false);

  const [isModalNome, setIsModalNome] = useState(false);
  const [reservado, setReservado] = useState(false);

  const [section, setSection] = useState("presentes");

  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleMaxPriceChange = (e) => setMaxPrice(e.target.value);

  const [faq, setFaq] = useState([
    {
      pergunta: "Onde fica o salão?",
      resposta:
        "O salão está localizado na Rua Araguaia, 233, Santo André, SP.",
    },
    {
      pergunta: "Qual é o tema da festa?",
      resposta: "O tema da nossa festa é 'Anos 2000'!",
    },
    {
      pergunta: "Devo ir fantasiado?",
      resposta: "Sim! Vista-se a caráter para entrar no clima dos anos 2000.",
    },
    {
      pergunta: "Qual é a data e o horário?",
      resposta:
        "A festa acontecerá no dia 31 de maio (sábado), das 16:00 às 22:00.",
    },
    {
      pergunta: "Quais serão as opções de refeição?",
      resposta:
        "Salgadinhos de festa, batatinha temperada, salada, macarrão ao molho sugo, branco ou sem molho. Doces, bolos e outras surpresas à parte! ",
    },
    {
      pergunta: "Quais serão as bebidas?",
      resposta:
        "Vamos servir refrigerantes, sucos e água. Caso queira, pode trazer sua bebida alcoólica!",
    },
  ]);

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

  function fetchAll() {
    fetchPresentes();
    fetchRecados();
    fetchNome();
    setReservado(localStorage.getItem("presenca"))
  }

  useEffect(() => {
    fetchPresentes();
    fetchRecados();
    fetchNome();

    setReservado(localStorage.getItem("presenca"))
  }, []);

  const filteredPresentes = presentes
    .sort((a, b) => {
      if (a.nomePresenteador === nome && b.nomePresenteador !== nome) return -1;
      if (a.nomePresenteador !== nome && b.nomePresenteador === nome) return 1;
      return a.estado === "disponivel" ? -1 : b.estado === "disponivel" ? 1 : 0;
    })
    .filter((presente) => {
      const matchesSearch = presente.titulo
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesPrice =
        maxPrice === "" || parseFloat(presente.preco) <= parseFloat(maxPrice);
      return matchesSearch && matchesPrice;
    });

  function handleOpenModal(presente) {
    setPresente(presente);
    setIsModalOpen(true);
  }

  function handleOpenModalItem(presente) {
    setPresente(presente);
    setIsModalItem(true);
  }

  function handleOpenModalItemPrev(presente) {
    setPresente(presente);
    setIsModalItemPrev(true);
  }

  return (
    <>
      <Splash />

      <ModalNome isModalOpen={isModalNome} setIsModalOpen={setIsModalNome} />

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

      <ModalItem
        presente={presente}
        isModalOpen={isModalItem}
        setIsModalOpen={setIsModalItem}
      />

      <ModalItemPrev
        presente={presente}
        isModalOpen={isModalItemPrev}
        setIsModalOpen={setIsModalItemPrev}
      />

      <ModalPresenca
        isModalOpen={isModalPresenca}
        setIsModalOpen={setIsModalPresenca}
        reload={fetchAll}
      />

      {nome && (
        <div className=" w-full flex flex-col items-center justify-center gap-2 mt-8">
          <h2 className="text-3xl text-center">
            {new Date().getHours() < 12
              ? "Bom dia"
              : new Date().getHours() < 18
                ? "Boa tarde"
                : "Boa noite"}
            , {nome}
          </h2>
        </div>
      )}

      <div className="flex flex-col w-full text-center items-center justify-center mt-8 container mx-auto">
        <img
          src="eu.jpg"
          alt="Logo Lívia e Gustavo"
          className="w-auto h-40 rounded-full"
        />
        <div className="text-center px-2 text-xl md:text-2xl font-bold text-[#374151]">
          <h2 className="">Chá de casa nova da Lívia e do Gustavo</h2>
        </div>

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

          <div className="w-1/2 flex flex-col md:flex-row gap-2">
            <button
              type="button"
              className="w-full  cursor-pointer bg-white p-1 border border-[#eceef1] h-auto text-center text-md md:text-xl flex items-center justify-center shadow-md"
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

            <button
              type="button"
              className="w-full  cursor-pointer bg-white p-1 border border-[#eceef1] h-auto text-center text-md md:text-xl flex items-center justify-center shadow-md"
              onClick={() => {
                setIsModalNome(true);
              }}
            >
              <FontAwesomeIcon
                className="inline w-auto h-5 md:h-8 me-2"
                icon={faArrowsSpin}
              />
              Mudar nome
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center justify-center w-full px-1 md:px-2">
        <div className="flex flex-col gap-3 bg-[#ffffff] w-full md:w-2/3 p-4 shadow-sm">
          <p className="text-lg md:text-xl font-light">
            No nosso 21º aniversário, decidimos dar um grande passo e montar nosso cantinho juntos! Estamos muito felizes e queremos compartilhar esse momento especial com você. Contamos com sua presença na nossa festa e, se desejar, com uma contribuição para o nosso novo lar!
          </p>

          <div className="pb-2 text-center">

            <div className="flex md:flex-row flex-col  gap-8 justify-center ">

              <div className="">
                <h2 className="text-xl font-bold">
                  Rua Araguaia, 233 - Santo André, SP
                </h2>
                <p className="text-lg font-light">
                  Evento: Sábado, 31 de maio de 2025 - 17:00
                </p>
              </div>

              <div className="">
                <h2 className="text-xl font-bold">
                R. Almada, 495 - Jardim Santo Alberto, SP
                </h2>
                <p className="text-lg font-light">
                  Endereço para entrega de presentes
                </p>
              </div>
            </div>

            <div className="flex w-full h-auto justify-center items-center mt-4">
              <button
                type="button"
                className={`flex items-center justify-center w-full md:w-fit cursor-pointer bg-white px-4 py-2 border border-[#eceef1] h-auto text-center text-xl shadow-md transition duration-300 text-green-400 font-bold`}
                disabled={reservado}
                onClick={() => {
                  setIsModalPresenca(true);
                }}
              >
                <FontAwesomeIcon
                  className="inline w-auto h-8 me-2 "
                  icon={faCheckToSlot}
                />
                {reservado ? (<>
                  Já confirmado
                </>) : (<>
                  Confirmar presença
                </>)}

              </button>
            </div>
          </div>
        </div>
      </div>


      <section className="container mx-auto px-3 my-4">
        <div className="flex flex-col md:flex-row gap-4">
          <button
            type="button"
            className={`flex items-center justify-center w-full md:w-fit cursor-pointer bg-white px-4 py-2 border border-[#eceef1] h-auto text-center text-xl shadow-md ${section === "presentes" ? "bg-[#dadbdd]" : ""
              }`}
            onClick={() => {
              setSection("presentes");
              fetchPresentes();
            }}
          >
            <FontAwesomeIcon className="inline w-auto h-8 me-2" icon={faGift} />
            Presentes
          </button>

          <button
            type="button"
            className={`flex items-center justify-center w-full md:w-fit cursor-pointer bg-white px-4 py-2 border border-[#eceef1] h-auto text-center text-xl shadow-md ${section === "recados" ? "bg-[#dadbdd]" : ""
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
            className={`flex items-center justify-center w-full md:w-fit cursor-pointer bg-white px-4 py-2 border border-[#eceef1] h-auto text-center text-xl shadow-md ${section === "informacoes" ? "bg-[#dadbdd]" : ""
              }`}
            onClick={() => {
              setSection("informacoes");
              fetchRecados();
            }}
          >
            <FontAwesomeIcon className="inline w-auto h-8 me-2" icon={faInfo} />
            Informações
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
              {/* <input
                type="number"
                placeholder="Preço máximo"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                className="border p-2 shadow-sm"
              /> */}
            </div>
            <p>Preços sujeitos a mudança!</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 gap-3">
              {filteredPresentes.map((presente, index) => (
                <Item
                  key={index}
                  presente={presente}
                  isMine={presente.nomePresenteador === nome}
                  onButtonClick={() => handleOpenModal(presente)}
                  onButtonClickAndComprado={() => handleOpenModalItem(presente)}
                  onTitleClick={() => handleOpenModalItemPrev(presente)}
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

        {section === "informacoes" ? (
          <>
            <div className="container p-2 px-2 lg:px-8 flex flex-col gap-2 my-4">
              <h2 className="font-bold text-4xl md:text-6xl">Sobre a festa</h2>

              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-2 lg:col-span-1">
                  {faq.map((item, index) => (
                    <Faq
                      key={index}
                      pergunta={item.pergunta}
                      resposta={item.resposta}
                    />
                  ))}
                </div>

                <div className="col-span-2 lg:col-span-1 w-full flex items-center justify-center m-3">
                  <img
                    src="convite.jpg"
                    alt=""
                    className=" max-h-[95vh] self-center"
                  />
                </div>
              </div>
            </div>
            <div className="container p-2 px-4 flex flex-col gap-2 my-4 text-[#a44141]">
              <h2 className="font-bold text-4xl md:text-6xl">
                Sobre a entrega dos presentes
              </h2>
              <p className="text-xl">
                É possível realizar a entrega no dia da festa ou enviar
                anteriormente para o seguinte endereço <br />
                Endereço para entrega de presentes:
              </p>

              <p className="text-xl font-bold">
                R. Almada, 495 - Jardim Santo Alberto
              </p>

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655.271881396531!2d-46.4952761!3d-23.630432399999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce686b1b133761%3A0x9a4580d9617a99a0!2sR.%20Almada%2C%20495%20-%20Jardim%20Santo%20Alberto%2C%20Santo%20Andr%C3%A9%20-%20SP%2C%2009260-420!5e0!3m2!1spt-BR!2sbr!4v1737325258455!5m2!1spt-BR!2sbr"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </>
        ) : null}
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
