import '../styles/globals.css'

import { createContext, useContext } from 'react'


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
