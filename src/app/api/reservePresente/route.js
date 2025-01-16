import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function POST(req) {
  const { id, estado, nomePreseteador, recado } = await req.json();

  // Validação básica dos dados
  if (!id || !estado) {
    return new Response(JSON.stringify({ error: 'ID e estado são obrigatórios' }), {
      status: 400,
    });
  }

  try {
    await client.connect();
    const database = client.db('listaDB');
    const collection = database.collection('presentes');

    const presente = await collection.findOne({ id: id });
    if (presente?.estado === 'reservado') {
      return new Response(JSON.stringify({ error: 'Presente já foi reservado' }), {
        status: 400,
      });
    }

    const result = await collection.updateOne(
      { id: id },
      { $set: { estado: estado, nomePresenteador: nomePreseteador, recado: recado } }
    );

    if (result.modifiedCount === 0) {
      return new Response(JSON.stringify({ error: 'Presente não encontrado' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: 'Estado do presente atualizado com sucesso' }), {
      status: 200,
    });
  } catch (error) {
    console.error(error); // Para depuração
    return new Response(JSON.stringify({ error: 'Erro ao atualizar presente' }), {
      status: 500,
    });
  } finally {
    await client.close();
  }
}
