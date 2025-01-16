import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function GET(req) {
  try {
    await client.connect();
    const database = client.db('listaDB');
    const collection = database.collection('recados');
    const recados = await collection.find({}).toArray();

    return new Response(JSON.stringify(recados), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Erro ao buscar recados' }),
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
