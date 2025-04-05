import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function DELETE(req) {
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

    const result = await collection.deleteOne({ id: id });

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
