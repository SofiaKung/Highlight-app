import UploadFiles from '../components/UploadFiles'
import { connectToDatabase } from '../utils/mongodb'
import Cards from '../components/Cards'

export default function Homepage({ properties, bookName }) {
  console.log(properties)
  return (
    <>
      <UploadFiles></UploadFiles>
      {properties && (
        <div>
          <h1 style={{ textAlign: 'center' }}> {bookName}</h1>

          {properties.map((item, index) => (
            <Cards
              key={index}
              _id={item._id}
              // to load modified highlights if available, else original highlights
              highlight={
                item.modifiedHighlight ? item.modifiedHighlight : item.highlight
              }
              chapter={item.chapter}
              note={item.note}
              favorite={item.favorite}
            />
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
  const book = data[0].bookName

  // console.log(data)

  return {
    props: { properties: data, bookName: book },
  }
}
