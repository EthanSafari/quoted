import { useContext, useEffect, useState } from "react";
import MessagePage from "./MessagePage";
import Navbar from "./Navbar";
import OptionsMenu from "./OptionsMenu";
import { useAuthState, useUpdateProfile } from "react-firebase-hooks/auth";
import { auth, firestoreDb } from "../firebase/clientApp";
import { useRouter } from "next/router";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { PageContext } from "../context/PageContext";
import EditProfile from "./EditProfile";


export default function LoggedinHomepage() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const { pageNumber } = useContext(PageContext);
  useEffect(() => {
    if (user && !user?.displayName) {
      const newUserName = user?.email.split('@')[0];
      const userDocRef = doc(firestoreDb, 'users', newUserName);
      setDoc(userDocRef, {
        username: newUserName,
        profilePhotoUrl: user?.photoURL || "",
        description: "",
        createdAt: serverTimestamp(),
      });
      updateProfile({ displayName: newUserName, photoURL: user?.photoURL || "" });
    }
  }, []);
  return (
    <>
      <div>
        <Navbar />
        {pageNumber === 1 && <MessagePage />}
        {pageNumber === 2 && <OptionsMenu />}
        {pageNumber === 3 && <EditProfile />}
      </div>
    </>
  )
}
