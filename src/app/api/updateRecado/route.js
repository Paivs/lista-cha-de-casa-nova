// pages/api/updateRecado.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Seu URI do MongoDB
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id, nome, recado } = req.body;

    try {
      await client.connect();
      const database = client.db('listaDB');
      const collection = database.collection('recados');
      
      const result = await collection.updateOne(
        { _id: new MongoClient.ObjectId(id) }, 
        { $set: { nome, recado } }
      );
      
      if (result.modifiedCount === 0) {
        return res.status(404).json({ error: 'Recado não encontrado' });
      }
      
      res.status(200).json({ message: 'Recado atualizado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar recado' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
