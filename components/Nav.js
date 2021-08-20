import { useState } from 'react'
import Link from 'next/link'
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/outline'
import classes from './Nav.module.css'

export default function Nav() {
  const [sidebar, setSidebar] = useState(true)
  const showSidebar = () => setSidebar(!sidebar)

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
                  <a>Upload your higlights</a>
                </Link>
              </li>
              <li className={classes.navItem}>
                <Link href="/highlights">
                  <a>Highlights</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      ) : (
        ''
      )}
    </>
  )
}
