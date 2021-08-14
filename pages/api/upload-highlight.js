// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// /api/upload-highlight
import { MongoClient } from 'mongodb'

async function handler(req, res) {
  if (req.method == 'POST') {
    const data = req.body

    const client = await MongoClient.connect(
      'mongodb+srv://sofiakung:highfive5@cluster0.12cdz.mongodb.net/highlights?retryWrites=true&w=majority',
    )

    const db = client.db()
    const highlightCollection = db.collection('highlights')
    const result = await meetupsCollection.insertOne(data)

    console.log(result)
    client.close()
    res.status(201).json({ message: 'highlight inserted' })
  }
}

export default handler
