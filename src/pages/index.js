import LoggedinHomepage from "../components/LoggedIn/LoggedInHomepage";
import { auth, firestoreDb } from "../firebase/clientApp";
import { useAuthState } from 'react-firebase-hooks/auth';
import LandingPage from "../components/LoggedOut/LandingPage";
import { collection, onSnapshot, query } from "firebase/firestore";
import safeJsonStringify from "safe-json-stringify";
import { useDispatch } from "react-redux";
import { addAllMessages, addMessage, deleteMessage, updateMessage } from "../store/message";
import { useEffect } from "react";
import { addAllUsers, addUser, updateUser } from "../store/users";

export default function Home() {
  const dispatch = useDispatch();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    const getData = async () => {
      try {
        const messageSnapshot = await query(collection(firestoreDb, "messages"));
        onSnapshot(messageSnapshot, (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              dispatch(addMessage(JSON.parse(safeJsonStringify(change.doc.data()))))
              // messageData.push(JSON.parse(safeJsonStringify(change.doc.data())));
            }
            if (change.type === "modified") {
              dispatch(updateMessage(JSON.parse(safeJsonStringify(change.doc.data()))))
            }
            if (change.type === "removed") {
              dispatch(deleteMessage(JSON.parse(safeJsonStringify(change.doc.data().id))))
            }
          });
        });
        const userSnapshot = await query(collection(firestoreDb, "users"));
        onSnapshot(userSnapshot, (snapshot) => {
                    snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              dispatch(addUser(JSON.parse(safeJsonStringify(change.doc.data()))))
            }
            if (change.type === "modified") {
              dispatch(updateUser(JSON.parse(safeJsonStringify(change.doc.data()))))
            }
            if (change.type === "removed") {
            }
          });
        })
      } catch (error) {
        console.log(error)
        dispatch(addAllMessages([]));
        dispatch(addAllUsers([]));
        return;
      }
    }
    getData()
  }, []);

  return (
    <>
      {user ? <LoggedinHomepage /> : <LandingPage />}
    </>
  )
};

// export async function getServerSideProps() {
//   try {
//     const messageData = [];
//     const userData = [];
//     const messageSnapshot = await getDocs(collection(firestoreDb, "messages"));
//     messageSnapshot.forEach((doc) => {
//       messageData.push(JSON.parse(safeJsonStringify(doc.data())));
//     });
//     const userSnapshot = await getDocs(collection(firestoreDb, "users"));
//     userSnapshot.forEach((doc) => {
//       userData.push(JSON.parse(safeJsonStringify(doc.data())));
//     });
//     return {
//       props: {
//         messageData: messageData,
//         userData: userData,
//       }
//     }
//   } catch (error) {
//     console.log(error)
//     return {
//       props: {
//         messageData: [],
//         userData: [],
//       }
//     }
//   }
// }
