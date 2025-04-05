import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function POST(req) {
  const { id, titulo, descricao, preco, link, imagem, estado } =
    await req.json();

    console.log(id, titulo, descricao, preco, link, imagem, estado)

  if (!titulo || !descricao || !preco || !link || !imagem || !estado) {
    return new Response(
      JSON.stringify({ error: "Todos os itens são obrigatórios" }),
      { status: 400 }
    );
  }

  try {
    await client.connect();
    const database = client.db("listaDB");
    const collection = database.collection("presentes");

    const lastPresente = await collection.findOne({}, { sort: { id: -1 } });
    const newId = lastPresente ? lastPresente.id + 1 : 1;

    const newPresente = { id: newId, titulo, descricao, preco, link, imagem, estado };
    const result = await collection.insertOne(newPresente);

    return new Response(
      JSON.stringify({
        message: "Presente criado com sucesso",
        id: result.insertedId,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Erro ao criar recado" }), {
      status: 500,
    });
  } finally {
    await client.close();
  }
}
