export default function PixCopia({mensagem = "Copiar chave PIX (NuBank): gustavo.paiva.gp1@gmail.com"}) {
  return (
    <>
      <button
        type="button"
        className="my-4 text-white font-bold  bg-green-400 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 px-4 py-2 rounded-md"
        onClick={() => {
          navigator.clipboard.writeText("gustavo.paiva.gp1@gmail.com");
          alert("Chave PIX copiada!");
        }}
      >
        <p className="">
        {mensagem}
        </p>
      </button>
    </>
  );
}
