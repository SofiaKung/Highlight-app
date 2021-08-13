import classes from './Cards.module.css'
import { useState } from 'react'

import {
  ChatAltIcon,
  TrashIcon,
  PencilAltIcon,
  HeartIcon,
} from '@heroicons/react/outline'

export default function Cards(props) {
  const [note, setNote] = useState([])

  const changeHandler = (event) => {
    setNote(event.target.value)
  }

  return (
    <>
      <div className={classes.card}>
        <h4 className={classes.title}>{props.chapter}</h4>
        <p className={classes.para}>{props.highlight}</p>
        <div className={classes.note}>
          <div contentEditable="true">{props.note}</div>
        </div>

        {/* icons section */}
        <div className={classes.iconSection}>
          <button className={classes.button}>
            <ChatAltIcon className={classes.icon} />
          </button>
          <button className={classes.button}>
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
