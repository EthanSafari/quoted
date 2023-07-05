import LoggedinHomepage from "../components/LoggedIn/LoggedInHomepage";
import { auth, firestoreDb } from "../firebase/clientApp";
import { useAuthState } from 'react-firebase-hooks/auth';import LandingPage from "../components/LoggedOut/LandingPage";
import { useRouter } from "next/router";
import { collection, getDocs } from "firebase/firestore";
import safeJsonStringify from "safe-json-stringify";
;

export default function Home({ messageData }) {
  const [user, loading, error] = useAuthState(auth);
  // console.log(messageData)
  return (
    <>
      {user ? <LoggedinHomepage messageData={messageData} /> : <LandingPage />}
    </>
  )
};

export async function getServerSideProps() {
  try {
      const data = [];
      const snapshot = await getDocs(collection(firestoreDb, "messages"));
      snapshot.forEach((doc) => {
          data.push(JSON.parse(safeJsonStringify(doc.data())));
      });
      // console.log('data', data)
      return {
          props: {
              messageData: data,
          }
      }
  } catch (error) {
      console.log(error)
  }
}
