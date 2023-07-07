import { useContext, useEffect, useState } from "react";
import MessagePage from "./MessagePage";
import Navbar from "../Navbar/Navbar";
import OptionsMenu from "../Navbar/OptionsMenu";
import { useAuthState, useUpdateProfile } from "react-firebase-hooks/auth";
import { auth, firestoreDb } from "../../firebase/clientApp";
import { useRouter } from "next/router";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { PageContext } from "../../context/PageContext";
import EditProfile from "../OptionsMenuOptions/EditProfile";
import UserMessages from "../OptionsMenuOptions/UserMessages";


export default function LoggedinHomepage() {
  const { pageNumber } = useContext(PageContext);
  return (
    <>
      <div>
        <Navbar />
        {pageNumber === 1 && <MessagePage />}
        {pageNumber === 2 && <OptionsMenu />}
        {pageNumber === 3 && <EditProfile />}
        {pageNumber === 4 && <UserMessages />}
      </div>
    </>
  )
}
