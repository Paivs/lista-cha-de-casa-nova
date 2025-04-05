import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function DELETE(req) {
  const { nome, recado } = await req.json();

  if (!nome || !recado) {
    return new Response(JSON.stringify({ error: 'Nome e recado são obrigatórios' }), {
      status: 400,
    });
  }

  try {
    await client.connect();
    const database = client.db('listaDB');
    const collection = database.collection('recados');

    const result = await collection.deleteOne({ $and: [{ nome }, { recado }] });

    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ error: 'Presente não encontrado' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: 'Presente deletado com sucesso' }), {
      status: 200,
    });
  } catch (error) {
    console.error(error); // Para depuração
    return new Response(JSON.stringify({ error: 'Erro ao deletar presente' }), {
      status: 500,
    });
  } finally {
    await client.close();
  }
}
