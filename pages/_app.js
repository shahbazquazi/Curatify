import '../styles/globals.css'
import Navbar from "../components/layout/Navbar";

function MyApp({ Component, pageProps }) {
  
  return (
  <>
  <Navbar/>
  <Component {...pageProps} />
  </>
  )
}

export default MyApp
