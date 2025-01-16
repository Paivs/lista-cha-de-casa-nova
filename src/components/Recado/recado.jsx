export default function Recado({nome, mensagem}){
    return(
        <div className={`flex flex-col grow shadow-md justify-between border-gray-200 border p-3`}>
            <p className="text-xl text-wrap min-w-48">- {mensagem}</p>
            <p className="text-xl font-bold">{nome}</p>
        </div>
    )
}