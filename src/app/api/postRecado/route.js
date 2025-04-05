import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function POST(req) {
  const { nome, recado } = await req.json();

  if (!nome || !recado) {
    return new Response(
      JSON.stringify({ error: 'Nome e recado são obrigatórios' }),
      { status: 400 }
    );
  }

  try {
    await client.connect();
    const database = client.db('listaDB');
    const collection = database.collection('recados');

    const newRecado = { nome, recado };
    const result = await collection.insertOne(newRecado);

    return new Response(
      JSON.stringify({ message: 'Recado criado com sucesso', id: result.insertedId }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Erro ao criar recado' }),
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
