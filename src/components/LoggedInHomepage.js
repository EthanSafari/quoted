import { useState } from "react";
import MessagePage from "./MessagePage";
import Navbar from "./Navbar";
import OptionsMenu from "./OptionsMenu";


export default function LoggedinHomepage() {
  const [openMenu, setOpenMenu] = useState(false);
  return (
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
