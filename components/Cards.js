import classes from './Cards.module.css'
import { useState } from 'react'

import {
  ChatAltIcon,
  TrashIcon,
  PencilAltIcon,
  HeartIcon as OutlineIcon,
} from '@heroicons/react/outline'

import { HeartIcon as SolidIcon } from '@heroicons/react/solid'

export default function Cards(props) {
  const [editQuote, setEditQuote] = useState(false)
  const [Highlight, setHighlight] = useState(props.highlight)
  const [Note, setNote] = useState(props.note)
  const [isFavorite, setFavorite] = useState(props.favorite)

  // enable highlight to be edited
  function enableQuoteEdit() {
    setEditQuote((editQuote) => true)
  }

  // enable favorite and update favorite tag
  function enableFavorite() {
    setFavorite(() => !isFavorite)
    console.log('Favorite status:', !isFavorite)
    handleFavorite()
  }

  // update Note state according to input
  const changeNoteHandler = (e) => {
    console.log('change note handler running')
    setNote(e.target.innerText)
    console.log('updated notes', Note)
  }

  // update Highlight state according to input
  const changeHighlightHandler = (e) => {
    console.log('change highlight handler running')
    setHighlight(e.target.innerText)
    console.log('updated highlight', Highlight)
  }

  // update highlight and note to db upon clicking Save button
  const handleSave = () => {
    let id = props._id
    let modifiedHighlight = Highlight //save to modified highlight column name
    let note = Note //save to modified highlight note name
    handleUpdate(id, { modifiedHighlight, note })
  }

  // update favorite tag to db
  const handleFavorite = () => {
    let id = props._id
    let favorite = !isFavorite //save to modified highlight column name
    handleUpdate(id, { favorite })
  }

  // Update highlights
  const handleUpdate = async (id, updatedData) => {
    console.log('start of handleUpdate ' + id)
    await fetch('api/update-highlights/' + id, {
      method: 'PUT', //put for updating
      body: JSON.stringify(updatedData),
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // enable favorite and update favorite tag
  const enableDelete = async () => {
    handleDelete(props._id).then(window.location.reload())
  }

  // delete highlight
  const handleDelete = async (id) => {
    console.log('delete highlight initated: ' + id)
    await fetch('api/delete-highlights/' + id, {
      method: 'DELETE', //put for updating
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
            {props.note ? props.note : 'Note'}
          </div>

          <button className={classes.saveButton} onClick={handleSave}>
            Save
          </button>
        </div>

        {/* icons section */}
        <div className={classes.iconSection}>
          <button className={classes.button}>
            <ChatAltIcon className={classes.icon} />
          </button>
          <button className={classes.button} onClick={enableQuoteEdit}>
            <PencilAltIcon className={classes.icon} />
          </button>

          {isFavorite ? (
            <button className={classes.button} onClick={enableFavorite}>
              <SolidIcon className={classes.icon} />
            </button>
          ) : (
            <button className={classes.button} onClick={enableFavorite}>
              <OutlineIcon HeartIcon className={classes.icon} />
            </button>
          )}

          <button className={classes.button}>
            <TrashIcon className={classes.icon} onClick={enableDelete} />
          </button>
        </div>
      </div>
    </>
  )
}
