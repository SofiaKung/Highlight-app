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

  function EditNote() {
    updateNote(event.target.value)
  }

  return (
    <>
      <div className={classes.card}>
        <h4 className={classes.title}>{props.chapter}</h4>
        <div className={classes.para} contentEditable={editQuote}>
          {props.highlight}
          <button onClick={saveHighlight}>Save</button>
        </div>
        {/* start of notes section */}
        <div className={classes.note}>
          <div contentEditable="true">{props.note}</div>
          <button onClick={EditNote}>Save</button>
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
