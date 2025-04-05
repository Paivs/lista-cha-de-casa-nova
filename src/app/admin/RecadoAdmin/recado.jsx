export default function Recado({ nome, mensagem }) {
  function handleRemoveRecado() {
    const confirmRemove = window.confirm(
      `Tem certeza que deseja remover o recado de ${nome}?`
    );
    if (!confirmRemove) return;
    
    fetch(`/api/admin/removeRecado`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome: nome, recado: mensagem }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          window.location.reload();
        }
      })
      .catch((error) => {
        alert("Erro ao remover o recado");
      });
  }

  return (
    <div
      className={`flex flex-col grow shadow-md justify-between border-gray-200 border p-3`}
    >
      <p className="text-xl text-wrap min-w-48">- {mensagem}</p>
      <p className="text-xl font-bold">{nome}</p>
      <button
        type="button"
        className="text-white rounded-full px-2 bg-red-400"
        onClick={handleRemoveRecado}
      >
        X
      </button>
    </div>
  );
}
