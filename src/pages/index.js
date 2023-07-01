import { Inter } from 'next/font/google'
import Messages from '../components/Messages'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
     <div>
      <Messages />
     </div>
    </>
  )
}
