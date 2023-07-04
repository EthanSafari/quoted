import { useState } from "react";
import MessagePage from "../components/MessagePage";
import Navbar from "../components/Navbar";
import OptionsMenu from "../components/OptionsMenu";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/clientApp";
import { useRouter } from "next/router";


export default function LoggedinHomepage() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [openMenu, setOpenMenu] = useState(false);
  console.log(user)
  if (!user) router.push('/landing');
  else return (
    <>
      <div>
        <Navbar openMenu={openMenu} setOpenMenu={setOpenMenu} />
        {!openMenu ?
          <MessagePage /> :
          <OptionsMenu openMenu={openMenu} setOpenMenu={setOpenMenu} />
        }
      </div>
    </>
  )
}
