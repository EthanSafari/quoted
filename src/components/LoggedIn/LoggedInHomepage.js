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


export default function LoggedinHomepage({ messageData }) {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const { pageNumber } = useContext(PageContext);
  useEffect(() => {
    if (!user.displayName) {
      const newUserName = user?.email.split('@')[0];
      const userDocRef = doc(firestoreDb, 'users', user?.uid);
      setDoc(userDocRef, {
        id: user.uid,
        email: user.email,
        username: newUserName,
        profilePhotoUrl: user?.photoURL || "",
        // description: "",
        createdAt: serverTimestamp(),
      });
      updateProfile({ displayName: newUserName, photoURL: user?.photoURL || "" });
    };
  }, []);
  return (
    <>
      <div>
        <Navbar />
        {pageNumber === 1 && <MessagePage messageData={messageData} />}
        {pageNumber === 2 && <OptionsMenu />}
        {pageNumber === 3 && <EditProfile />}
        {pageNumber === 4 && <UserMessages />}
      </div>
    </>
  )
}
