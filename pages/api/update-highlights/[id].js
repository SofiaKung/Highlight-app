// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// /api/update-highlights/[id]

import { ObjectId } from 'mongodb'
import { connectToDatabase } from '../../../utils/mongodb'

async function handler(req, res) {
  console.info('[updateHighlight] triggered')
  if (req.method === 'PUT') {
    const { id } = req.query
    const data = req.body // built in field for incoming data
    console.info('[updateHighlight] input id: ', id, ' input body: ', req.body)

    const { db } = await connectToDatabase()
    const highlightCollection = await db.collection('highlights')

    const result = await highlightCollection.findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: data },
    )

    res.status(200).json({ message: 'highlight updated', result: result })
    console.info('[updateHighlight] result:', result)
  }
}

export default handler
