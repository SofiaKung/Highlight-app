import { useState } from 'react'
import Cards from './Cards'

import Papa from 'papaparse'

function UploadFiles() {
  const [selectedFile, setSelectedFile] = useState()
  const [parsedCsv, setparsedCsv] = useState([])

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const submit = () => {
    Papa.parse(selectedFile, {
      header: true,
      dynamicTyping: true,
      complete: function (results) {
        setparsedCsv(
          results.data.map((element) => ({
            highlight: element.quote,
            chapter: element.chapter,
          })),
        )

        console.log(parsedCsv)
      },
    })
  }

  const submitFile = (event) => {
    console.log('submit button clicked')
    event.preventDefault()
    submit()
  }

  return (
    <>
      <div>
        <input type="file" name="file" onChange={changeHandler}></input>
        <button onClick={submitFile}>Upload your higlights</button>
      </div>
      {parsedCsv.length > 0 && (
        <div>
          {parsedCsv.map((item, index) => (
            <>
              <Cards highlight={item.highlight} chapter={item.chapter} />
            </>
          ))}
        </div>
      )}
    </>
  )
}
export default UploadFiles
