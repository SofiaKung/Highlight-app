// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// /api/update-highlights/[id]

import { connectToDatabase } from '../../utils/mongodb'

async function handler(req, res) {
  console.info('[updateHighlight] triggered')
  if (req.method === 'PUT') {
    const data = req.body // built in field for incoming data
    const { highlight, note } = data // destructure to get highlight and notes

    // const { id } = req.query

    // res.end(`Post: ${id}`)
    // console.log(req)

    // const { db } = await connectToDatabase()

    // const highlightCollection = await db.collection('highlights')

    // console.info('[uploadHighlight] highlightCollection', highlightCollection)

    // const result = await highlightCollection.findOneAndUpdate(
    //   { _id: id },
    //   { highlight: highlight, note: note },
    // )
    // console.info('[uploadHighlight] result:', result)

    // res.status(200).json({ message: 'highlight updated', result: result })

    // client.close()
  }
}

export default handler
