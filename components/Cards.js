import classes from './Cards.module.css'
import { useState } from 'react'

import {
  ChatAltIcon,
  TrashIcon,
  PencilAltIcon,
  HeartIcon,
} from '@heroicons/react/outline'

export default function Cards(props) {
  const [editQuote, setEditQuote] = useState('false')
  const [editNote, updateNote] = useState('false')

  function enableQuoteEdit() {
    setEditQuote((editQuote) => 'true')
  }

  function saveHighlight() {
    setEditQuote((editQuote) => 'false')
  }

  function handleSave() {
    let id = props._id
    let highlight = props.highlight
    let notes = props.note
    handleUpdate(id, { highlight, notes })
    // console.log(ObjectId(props._id))
    // updateNote(event.target.value)
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
      <div className={classes.card}>
        <h4 className={classes.title}>{props.chapter}</h4>
        <p hidden className={classes._id}>
          {props._id}
        </p>
        <div className={classes.para} contentEditable={editQuote}>
          {props.highlight}
        </div>

        {/* start of notes section */}
        <div className={classes.note}>
          <div contentEditable="true">{props.note}</div>

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
