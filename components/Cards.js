import classes from './Cards.module.css'
import { useState } from 'react'

import {
  ChatAltIcon,
  TrashIcon,
  PencilAltIcon,
  HeartIcon as OutlineIcon,
  TagIcon,
  XIcon,
} from '@heroicons/react/outline'

import { HeartIcon as SolidIcon } from '@heroicons/react/solid'

export default function Cards(props) {
  // allow highlight to be editable
  const [editQuote, setEditQuote] = useState(false)
  const [Highlight, setHighlight] = useState(props.highlight)
  // show add tag status
  const [tagStatus, setTagStatus] = useState(false)
  // list of tags
  const [tagArray, setTag] = useState(props.tag ?? []) // checks for props.tag if true then props.tag else []
  const [tagInput, setTagInput] = useState()
  const [Note, setNote] = useState(props.note)
  const [isFavorite, setFavorite] = useState(props.favorite)

  // update highlight and note to db upon clicking Save button
  const handleSave = () => {
    handleUpdate(props._id, { modifiedHighlight: Highlight, note: Note })
  }

  // Update highlights
  const handleUpdate = async (id, updatedData) => {
    // console.log('start of handleUpdate ' + id)
    await fetch('/api/update-highlights/' + id, {
      method: 'PUT', //put for updating
      body: JSON.stringify(updatedData),
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // delete highlight
  const handleDelete = async (id) => {
    // console.log('delete highlight initated: ' + id)
    await fetch('/api/delete-highlights/' + id, {
      method: 'DELETE', //put for updating
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // function to delete tags
  const deleteTag = function (e) {
    const tagToRemove = e.target.innerText
    let updated_array = arrayRemove(tagArray, tagToRemove)
    setTag(updated_array)
    handleUpdate(props._id, { tag: updated_array })
  }

  // function to remove items from array
  function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
      return ele != value
    })
  }

  // when users press on enter to add tag, update tag state and update the tags in DB
  const keyPress = function (event) {
    if ([13, 36, 76].includes(event.charCode)) {
      event.preventDefault() // prevent the page from scrolling up after delete tag
      setTagInput('')
      document.getElementById('tagInput').focus()
      const updated_tag = tagArray.concat([event.target.value])
      setTag(updated_tag)
      handleUpdate(props._id, { tag: updated_tag })
    }
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
          onInput={(e) => setHighlight(e.target.innerText)}
        >
          {props.highlight}
        </div>

        {/* start of notes section */}
        <div className={classes.note}>
          <div
            contentEditable="true"
            suppressContentEditableWarning={true}
            onInput={(e) => setNote(e.target.innerText)}
          >
            {props.note ?? 'Note'}
          </div>

          <button
            className={classes.saveButton}
            onClick={() =>
              handleUpdate(props._id, {
                modifiedHighlight: Highlight,
                note: Note,
              })
            }
          >
            Save
          </button>
        </div>

        {/* icons row */}
        {/* display tags  */}
        <div className={classes.row}>
          <div className={classes.tagSection}>
            {tagArray &&
              tagArray.map((tagItem, index) => (
                <button
                  className={classes.tagButton}
                  key={index}
                  onClick={deleteTag}
                >
                  {tagItem}
                  <XIcon className={classes.deleteTag} />
                </button>
              ))}
          </div>
          {/* start of icon section */}
          <div className={classes.iconSection}>
            {/* show add tag if tag icon is clicked */}
            {tagStatus && (
              <input
                id="tagInput"
                // contentEditable="true"
                className={classes.tagInput}
                onChange={(e) => {
                  setTagInput(e.target.input)
                }}
                onKeyPress={keyPress}
                value={tagInput}
                defaultValue="Add a tag"
              />
            )}

            <button
              className={classes.button}
              onClick={() => setTagStatus(true)}
            >
              <TagIcon className={classes.icon} />
            </button>
            <button
              className={classes.button}
              onClick={() => setEditQuote(true)}
            >
              <PencilAltIcon className={classes.icon} />
            </button>

            <button
              className={classes.button}
              onClick={() => {
                setFavorite(!isFavorite)
                // update favorite status to db
                handleUpdate(props._id, { favorite: !isFavorite })
              }}
            >
              {isFavorite ? (
                <SolidIcon className={classes.icon} />
              ) : (
                <OutlineIcon className={classes.icon} />
              )}
            </button>

            <button className={classes.button}>
              <TrashIcon
                className={classes.icon}
                onClick={async () => {
                  // delete highlight and refresh page
                  handleDelete(props._id).then(window.location.reload())
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
