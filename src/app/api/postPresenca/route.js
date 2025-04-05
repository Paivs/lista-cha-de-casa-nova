import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function POST(req) {
  const { nome } = await req.json();

  if (!nome) {
    return new Response(
      JSON.stringify({ error: 'Nome é obrigatório' }),
      { status: 400 }
    );
  }

  try {
    await client.connect();
    const database = client.db('listaDB');
    const collection = database.collection('presenca');

    const filter = { nome };
    const existing = await collection.findOne(filter);

    if (existing) {
      return new Response(
        JSON.stringify({ error: `Já existe uma presenca de ${nome}` }),
        { status: 400 }
      );
    }

    const newRecado = { nome, estado: "confirmado" };
    const result = await collection.insertOne(newRecado);

    return new Response(
      JSON.stringify({ message: 'presenca feita com sucesso', id: result.insertedId }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Erro ao fazer a presenca' }),
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
