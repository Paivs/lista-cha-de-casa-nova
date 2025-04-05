import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function POST(req) {
  const { id } = await req.json();

  if (!id) {
    return new Response(JSON.stringify({ error: 'ID é obrigatório' }), {
      status: 400,
    });
  }

  try {
    await client.connect();
    const database = client.db('listaDB');
    const collection = database.collection('presentes');

    const result = await collection.updateOne(
      { id: id },
      { $set: { estado: 'disponivel' }, $unset: { nomePresenteador: '', recado: '' } }
    );

    if (result.modifiedCount === 0) {
      return new Response(JSON.stringify({ error: 'Presente não encontrado' }), {
        status: 404,
      });
    }

    console.log("presente com id ", id, " resetado");

    return new Response(JSON.stringify({ message: 'Presente resetado com sucesso' }), {
      status: 200,
    });
  } catch (error) {
    console.error(error); // Para depuração
    return new Response(JSON.stringify({ error: 'Erro ao resetar presente' }), {
      status: 500,
    });
  } finally {
    await client.close();
  }
}
