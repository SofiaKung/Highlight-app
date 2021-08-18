import { useState, useEffect } from 'react'
import Cards from './Cards'
import classes from './UploadFiles.module.css'

import Papa from 'papaparse'

export default function UploadFiles() {
  const [selectedFile, setSelectedFile] = useState()

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
        // to upload highlights into db
        handleUpload(
          results.data.map((element) => ({
            highlight: element.quote,
            modifiedHighlight: '',
            chapter: element.chapter,
            note: element.note,
            favorite: false,
          })),
        ).then(window.location.reload()) // reload the page so that highlights are fetched
      },
    })
  }

  //upload highlights
  const handleUpload = async (file) => {
    res = await fetch('api/upload-highlight', {
      method: 'POST',
      body: JSON.stringify(file),
      headers: { 'Content-Type': 'application/json' },
    })
    console.log(res)
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
    </>
  )
}
