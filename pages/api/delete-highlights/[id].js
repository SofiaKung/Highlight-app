// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// /api/update-highlights/[id]

import { ObjectId } from 'mongodb'
import { connectToDatabase } from '../../../utils/mongodb'

async function handler(req, res) {
  console.info('[deleteHighlight] triggered')
  if (req.method === 'DELETE') {
    const { id } = req.query
    console.info('[deleteHighlight] input id: ', id)

    const { db } = await connectToDatabase()
    const highlightCollection = await db.collection('highlights')

    const result = await highlightCollection.deleteOne({ _id: ObjectId(id) })

    res.status(200).json({ message: 'highlight deleted', result: result })
    console.info('[deleteHighlight] result:', result)
  }
}

export default handler
