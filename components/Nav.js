import { useState, useEffect } from 'react'
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/outline'
import Link from 'next/link'
import classes from './Nav.module.css'
import { useAppContext } from '../context/global_state'

export default function Nav() {
  const [bookname, setBookname] = useState([])
  const [sidebar, setSidebar] = useState(true)
  const { books } = useAppContext()
  const showSidebar = () => setSidebar(!sidebar)

  async function handleFetch() {
    console.log('handle fetch in progress')
    const res = await fetch('api/read-bookname')
    const data = await res.text().then(JSON.parse)
    // const data = JSON.parse(res)
    console.log('handle fetch res:', data.result)
    setBookname(data.result)
  }

  useEffect(() => {
    console.log('calling useEffect')
    handleFetch()
  }, [])
  console.log('processing')

  return (
    <>
      {/* button to show side bar */}
      <button className={classes.showButton} onClick={showSidebar}>
        <ChevronDoubleRightIcon className={classes.rightIcon} />
      </button>
      <span>{console.log('rendering')}</span>

      {/* side bar */}
      {sidebar && (
        <div className={classes.sideBar}>
          <nav className={classes.navMenu}>
            <ul className={classes.ul}>
              <button className={classes.button} onClick={showSidebar}>
                <ChevronDoubleLeftIcon className={classes.icon} />
              </button>
              <li className={classes.navItem}>
                <Link href="/">
                  <a>Import your highlights</a>
                </Link>
              </li>
              <li className={classes.navItem}>
                <Link href="/highlights">
                  <a>Books</a>
                </Link>
              </li>
              {bookname.map((book, index) => (
                <li key={index}>
                  <Link href="">
                    <a>{book}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  )
}
