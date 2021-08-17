import UploadFiles from '../components/UploadFiles'
import { connectToDatabase } from '../utils/mongodb'
import Cards from '../components/Cards'

export default function Homepage({ properties }) {
  console.log(properties)
  return (
    <>
      <UploadFiles></UploadFiles>
      {properties && (
        <div>
          {properties.map((item, index) => (
            <>
              <Cards
                _id={item._id}
                highlight={item.highlight}
                chapter={item.chapter}
                note={item.note}
              />
            </>
          ))}
        </div>
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase()

  const result = await db.collection('highlights').find({}).toArray()

  const data = JSON.parse(JSON.stringify(result))

  console.log(data)

  return {
    props: { properties: data },
  }
}
