import classes from './Cards.module.css'

export default function Cards(props) {
  return (
    <>
      <div className={classes.card}>
        <h4 className={classes.title}>{props.chapter}</h4>
        <p className={classes.para}>{props.highlight}</p>
      </div>
    </>
  )
}
