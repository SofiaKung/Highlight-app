// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// /api/upload-highlight

import { MongoClient } from 'mongodb'
import { connectToDatabase } from '../../utils/mongodb'

async function handler(req, res) {
  console.log('[uploadHighlight] triggered')
  if (req.method === 'POST') {
    const data = req.body

    const { db } = await connectToDatabase()

    const highlightCollection = await db.collection('highlights')

    // console.info('[uploadHighlight] highlightCollection', highlightCollection)

    const result = await highlightCollection.insertMany(data)
    console.info('[uploadHighlight] result:', result)

    client.close()
  }
}

export default handler
