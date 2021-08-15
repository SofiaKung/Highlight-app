// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// /api/read-highlight
import { MongoClient } from 'mongodb'
import { connectToDatabase } from '../../../utils/mongodb'

async function handler(req, res) {
  console.log('[readHighlight] triggered')
  if (req.method === 'GET') {
    console.log(req)

    const { db } = await connectToDatabase()

    const highlightCollection = await db.collection('highlights')

    console.info('[readHighlight] highlightCollection', highlightCollection)

    const result = await highlightCollection.find({})
    console.info('[readHighlight] result:', result)

    client.close()
    res.status(200).json({ message: 'read highlights', result: result })
  }
}

export default handler
