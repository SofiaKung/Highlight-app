// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// /api/update-highlight/[id]
import { MongoClient } from 'mongodb'
import { connectToDatabase } from '../../../utils/mongodb'

async function handler(req, res) {
  console.log('[updateHighlight] triggered')
  if (req.method === 'PUT') {
    const data = req.body
    const { id } = req.query

    console.log(req)

    const { db } = await connectToDatabase()

    const highlightCollection = await db.collection('highlights')

    console.info('[uploadHighlight] highlightCollection', highlightCollection)

    const result = await highlightCollection.findOneAndUpdate({ _id: id }, data)
    console.info('[uploadHighlight] result:', result)

    client.close()
    res.status(200).json({ message: 'highlight updated', result: result })
  }
}

export default handler
