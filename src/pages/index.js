import LoggedinHomepage from "../components/LoggedIn/LoggedInHomepage";
import { auth, firestoreDb } from "../firebase/clientApp";
import { useAuthState } from 'react-firebase-hooks/auth';
import LandingPage from "../components/LoggedOut/LandingPage";
import { collection, getDocs } from "firebase/firestore";
import safeJsonStringify from "safe-json-stringify";
import { useDispatch } from "react-redux";
import { addAllMessages } from "../store/message";
import { useEffect } from "react";
import { addAllUsers } from "../store/users";

export default function Home({ messageData, userData }) {
  const dispatch = useDispatch();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    dispatch(addAllMessages(messageData));
    dispatch(addAllUsers(userData));
  }, [dispatch]);

  return (
    <>
      {user ? <LoggedinHomepage /> : <LandingPage />}
    </>
  )
};

export async function getServerSideProps() {
  try {
    const messageData = [];
    const userData = [];
    const messageSnapshot = await getDocs(collection(firestoreDb, "messages"));
    messageSnapshot.forEach((doc) => {
      messageData.push(JSON.parse(safeJsonStringify(doc.data())));
    });
    const userSnapshot = await getDocs(collection(firestoreDb, "users"));
    userSnapshot.forEach((doc) => {
      userData.push(JSON.parse(safeJsonStringify(doc.data())));
    });
    return {
      props: {
        messageData: messageData,
        userData: userData,
      }
    }
  } catch (error) {
    console.log(error)
    return {
      props: {
        messageData: [],
        userData: [],
      }
    }
  }
}
