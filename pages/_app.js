import '../styles/globals.css'
import Layout from '../components/layout'
import { AppWrapper } from '../context/global_state'

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppWrapper>
  )
}

export default MyApp
