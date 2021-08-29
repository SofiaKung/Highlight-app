// imports relevant highlights for each book
import { connectToDatabase } from '../../utils/mongodb'
import Cards from '../../components/Cards'

export default function Homepage({ properties, bookName }) {
  return (
    <>
      {properties && (
        <div>
          <h1
            style={{
              margin: 'auto',
              textAlign: 'center',
              padding: '80px 0px 40px',
            }}
          >
            {bookName}
          </h1>

          {properties.map((item, index) => (
            <Cards
              key={index}
              _id={item._id}
              // to load modified highlights if available, else original highlights
              highlight={
                item.modifiedHighlight === ''
                  ? item.highlight
                  : item.modifiedHighlight
              }
              chapter={item.chapter}
              note={item.note}
              favorite={item.favorite}
              tag={item.tag}
            />
          ))}
        </div>
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  const bookname = context.query.bookname
  const format_bookname = bookname.split('_').join(' ')
  const { db } = await connectToDatabase()

  const result = await db
    .collection('highlights')
    .find({ bookName: format_bookname })
    .toArray()

  const data = JSON.parse(JSON.stringify(result))

  // console.log(data)

  return {
    props: { properties: data, bookName: format_bookname },
  }
}
