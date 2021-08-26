import { MongoClient } from 'mongodb'

let uri =
  'mongodb+srv://' +
  process.env.MONGO_DB_USER +
  ':' +
  process.env.MONGO_DB_PASS +
  '@cluster0.12cdz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
let dbName = 'highlights_app'

let cachedClient = null
let cachedDb = null

if (!uri) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local',
  )
}

if (!dbName) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local',
  )
}

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  const db = await client.db(dbName)

  cachedClient = client
  cachedDb = db

  return { client, db }
}
