import classes from './Cards.module.css'
import { useState } from 'react'

import {
  ChatAltIcon,
  TrashIcon,
  PencilAltIcon,
  HeartIcon,
} from '@heroicons/react/outline'

export default function Cards(props) {
  const [editQuote, setEditQuote] = useState(false)
  const [modihighlight, setHighlight] = useState(props.highlight)
  const [modinote, setNote] = useState(props.note)

  function enableQuoteEdit() {
    setEditQuote((editQuote) => 'true')
  }

  function saveHighlight() {
    setEditQuote((editQuote) => 'false')
  }

  // update highlights/ notesaccording to input
  const changeNoteHandler = (e) => {
    console.log('change  nothandler running')
    setNote(e.target.innerText)
    console.log('updated notes', modinote)
  }

  // update highlights/ notesaccording to input
  const changeHighlightHandler = (e) => {
    console.log('change higlight handler running')
    setHighlight(e.target.innerText)
    console.log('updated highlight', modihighlight)
  }

  // update highlight and note to db
  const handleSave = () => {
    console.log('in handle save', modihighlight)
    let id = props._id
    let modifiedHighlight = modihighlight //save to modified highlight column name
    let note = modinote //save to modified highlight note name
    handleUpdate(id, { modihighlight, note })
  }

  const handleUpdate = async (id, updatedData) => {
    console.log('start of handleUpdate ' + id)
    await fetch('api/update-highlights/' + id, {
      method: 'PUT', //put for updating
      body: JSON.stringify(updatedData),
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return (
    <>
      <div className={classes.card}>
        <h4 className={classes.title}>{props.chapter}</h4>
        <p hidden className={classes._id}>
          {props._id}
        </p>
        <div
          className={classes.para}
          contentEditable={editQuote}
          suppressContentEditableWarning={true}
          onInput={changeHighlightHandler}
        >
          {props.highlight}
        </div>

        {/* start of notes section */}
        <div className={classes.note}>
          <div
            contentEditable="true"
            suppressContentEditableWarning={true}
            onInput={changeNoteHandler}
          >
            {props.note}
          </div>

          <button onClick={handleSave}>Save</button>
        </div>

        {/* icons section */}
        <div className={classes.iconSection}>
          <button className={classes.button}>
            <ChatAltIcon className={classes.icon} />
          </button>
          <button className={classes.button} onClick={enableQuoteEdit}>
            <PencilAltIcon className={classes.icon} />
          </button>
          <button className={classes.button}>
            <HeartIcon className={classes.icon} />
          </button>
          <button className={classes.button}>
            <TrashIcon className={classes.icon} />
          </button>
        </div>
      </div>
    </>
  )
}
