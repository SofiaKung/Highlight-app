// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// /api/read-bookname

import { connectToDatabase } from '../../utils/mongodb'

async function handler(req, res) {
  // console.log('[read-bookname] triggered')

  const { db } = await connectToDatabase()

  const highlightCollection = await db.collection('highlights')

  const result = await highlightCollection.distinct('bookName')

  res.json(['Atomic Habits', 'Steal Like an Artist'])
}

export default handler
