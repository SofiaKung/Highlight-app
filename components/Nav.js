import { useState } from 'react'
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import classes from './Nav.module.css'
import { useAppContext } from '../context/global_state'

export default function Nav() {
  const [sidebar, setSidebar] = useState(true)
  const { books } = useAppContext();
  const showSidebar = () => setSidebar(!sidebar)

  return (
    <>
      {/* button to show side bar */}
      <button className={classes.showButton} onClick={showSidebar}>
        <ChevronDoubleRightIcon className={classes.rightIcon} />
      </button>

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
              {books.map((book, index) => (
                <li key={index}>
                  <Link href="">
                    <a>{book.name}</a>
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
