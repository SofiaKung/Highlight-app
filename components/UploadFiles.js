import { useState, useEffect } from 'react'
import Cards from './Cards'
import classes from './UploadFiles.module.css'

import Papa from 'papaparse'

function UploadFiles() {
  const [selectedFile, setSelectedFile] = useState()
  const [parsedCsv, setparsedCsv] = useState([])

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    console.info('submit button clicked')

    Papa.parse(selectedFile, {
      header: true,
      dynamicTyping: true,
      complete: function (results) {
        handleUpload(
          results.data.map((element) => ({
            highlight: element.quote,
            modifiedHighlight: '',
            chapter: element.chapter,
            note: element.note,
            favorite: false,
          })),
        ).then(handleRead())
      },
    })
  }

  //upload highlights
  const handleUpload = async (file) => {
    await fetch('api/upload-highlight', {
      method: 'POST',
      body: JSON.stringify(file),
      headers: { 'Content-Type': 'application/json' },
    })
    // handleRead()
  }
  // read highlights
  const handleRead = async () => {
    console.log('reading start')
    const result = await fetch('api/read-highlights')

    // to stringify the json object and then parse as json again
    const data = await result.json()
    const output = JSON.parse(JSON.stringify(data))

    console.log('receive response:', output)
    setparsedCsv(output)
  }

  const handleUpdate = async (id, updatedData) => {
    await fetch('api/update-highlight/' + id, {
      method: 'PUT', //put for updating
      body: JSON.stringify(updatedData),
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return (
    <>
      <h1 className={classes.heading}>Upload your highlights </h1>
      <div className={classes.center}>
        <h3> 1. How to import your highlights </h3>
        <p>
          Make sure the file is in CSV format. Label your column name according
          to these header names - ‘bookname’, ‘chapter’, ‘quote’ and ‘note’.
        </p>
        <input type="file" name="file" onChange={changeHandler}></input>
        <button onClick={handleSubmit}>Upload your higlights</button>
      </div>
      {parsedCsv.length > 0 && (
        <div>
          {parsedCsv.map((item, index) => (
            <>
              <Cards
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
export default UploadFiles
