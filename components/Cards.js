import classes from './Cards.module.css'

export default function Cards(props) {
  return (
    <>
      <div className={classes.card}>
        <h1 className={classes.title}>{props.chapter}</h1>
        <p className={classes.card}>{props.highlight}</p>
      </div>
    </>
  )
}
