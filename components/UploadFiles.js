import { useState } from 'react'

import Papa from 'papaparse'

function UploadFiles() {
  const [selectedFile, setSelectedFile] = useState()

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const submit = () => {
    Papa.parse(selectedFile, {
      complete: function (results) {
        console.log(results)
      },
    })
  }

  const submitFile = (event) => {
    console.log('submit button clicked')
    event.preventDefault()
    submit()
  }

  return (
    <div>
      <input type="file" name="file" onChange={changeHandler}></input>
      <button onClick={submitFile}>Upload your higlights</button>
    </div>
  )
}

export default UploadFiles
