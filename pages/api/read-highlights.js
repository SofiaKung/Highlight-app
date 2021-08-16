// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// /api/read-highlights

import { connectToDatabase } from '../../utils/mongodb'

async function handler(req, res) {
  console.log('[readHighlight] triggered')
  if (req.method === 'GET') {
    const { db } = await connectToDatabase()

    const highlightCollection = await db.collection('highlights')

    const result = await highlightCollection.find({}).toArray()

    res.status(200).json({ message: 'retreived', data: result })
  }
}

export default handler
