import { Inter } from 'next/font/google'
import Messages from '../components/Messages'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
     <div>
      <Navbar />
      <Messages />
      <Footer />
     </div>
    </>
  )
}
