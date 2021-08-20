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
  const { result, error } = useSWR('/api/read-bookname', fetcher)
  const [sidebar, setSidebar] = useState(true)
  const showSidebar = () => setSidebar(!sidebar)

  if (error) return <h1>Something went wrong!</h1>
  if (!result) return <h1>Loading...</h1>
  // const { bookname } = result
  console.log(result)

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
                  <a>Upload your highlights</a>
                </Link>
              </li>
              <li className={classes.navItem}>
                <Link href="/highlights">
                  <a>highlights</a>
                  {/* {result.map((bookname, index) => (
                    <a key={bookname.index}>bookname</a>
                  ))} */}
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
