import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('A variável de ambiente MONGODB_URI não está definida.');
}

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export async function GET(req) {
  try {
    await client.connect();
    const database = client.db('listaDB');
    const collection = database.collection('presentes');
    const presentes = await collection.find({}).toArray();
    return new Response(JSON.stringify(presentes), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erro ao buscar presentes' }), { status: 500 });
  } finally {
    await client.close();
  }
}
