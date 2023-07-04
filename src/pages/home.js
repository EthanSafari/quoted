import { useEffect, useState } from "react";
import MessagePage from "../components/MessagePage";
import Navbar from "../components/Navbar";
import OptionsMenu from "../components/OptionsMenu";
import { useAuthState, useUpdateProfile } from "react-firebase-hooks/auth";
import { auth, firestoreDb } from "../firebase/clientApp";
import { useRouter } from "next/router";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";


export default function LoggedinHomepage() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [openMenu, setOpenMenu] = useState(false);
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  console.log(user)
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
      updateProfile({ displayName: newUserName, photoURL: user?.photoUrl || "" });
    }
  }, []);
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
