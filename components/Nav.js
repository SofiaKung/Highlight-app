import { useState } from 'react'
import Link from 'next/link'
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/outline'
import classes from './Nav.module.css'
import useSWR from 'swr'

//fetcher for useSWR
async function fetcher(url) {
  const res = await fetch(url)
  return res
}

export default function Nav() {
  // const { result, error } = useSWR('/api/read-bookname', fetcher)
  const [sidebar, setSidebar] = useState(true)
  const showSidebar = () => setSidebar(!sidebar)
  const bookName = ['Atomic Habits', 'Steal Like an Artist']

  return (
    <>
      {/* button to show side bar */}
      <button className={classes.showButton} onClick={showSidebar}>
        <ChevronDoubleRightIcon className={classes.rightIcon} />
      </button>

      {/* side bar */}
      {sidebar ? (
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
              {bookName.map((book, index) => (
                <li key={index}>
                  <Link href="">
                    <a>{book}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : (
        ''
      )}
    </>
  )
}
