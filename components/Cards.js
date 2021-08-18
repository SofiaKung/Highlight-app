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
  const [modifiedHighlight, setHighlight] = useState('default')

  function enableQuoteEdit() {
    setEditQuote((editQuote) => 'true')
  }

  function saveHighlight() {
    setEditQuote((editQuote) => 'false')
  }

  // update highlight and note to db
  const handleSave = () => {
    console.log('in handle save', modifiedHighlight)
    let id = props._id
    let modifiedHighlight = modifiedHighlight //save to modified highlight column name
    let note = props.note //save to modified highlight note name
    handleUpdate(id, { modifiedHighlight, note })
  }

  const handleUpdate = async (id, updatedData) => {
    console.log('start of handleUpdate ' + id)
    await fetch('api/update-highlights/' + id, {
      method: 'PUT', //put for updating
      body: JSON.stringify(updatedData),
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // update highlights according to input
  const changeHandler = (e) => {
    console.log('change handler running')
    setHighlight(e.target.innerText)
    console.log('in change handler', modifiedHighlight)
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
          onInput={changeHandler}
        >
          {props.highlight}
        </div>
        <p>{modifiedHighlight}</p>

        {/* start of notes section */}
        <div className={classes.note}>
          <div contentEditable="true" suppressContentEditableWarning={true}>
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
