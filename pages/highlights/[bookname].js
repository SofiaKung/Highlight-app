// imports relevant highlights for each book
import { connectToDatabase } from '../../utils/mongodb'
//get access on router object, to get the values of URL
import { useRouter } from 'next/dist/client/router'
import Cards from '../../components/Cards'

export default function Homepage({ properties, bookName }) {
  // const router = useRouter()
  // const bookname = router.query.bookname

  // function formatBookname(book) {
  //   return book.split('_').join(' ')

  // const formatted_bookname = formatBookname(bookname)
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
                item.modifiedHighlight ? item.modifiedHighlight : item.highlight
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
    // props: { properties: data },
    props: { properties: data, bookName: format_bookname },
  }
}
