import LoggedinHomepage from "../components/LoggedInHomepage";
import { auth } from "../firebase/clientApp";
import { useAuthState } from 'react-firebase-hooks/auth';import LandingPage from "../components/LandingPage";
;

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  console.log(user)
  return (
    <>
      { user ? (
        <LoggedinHomepage />
      ) : (
        <LandingPage />
      )}
    </>
  )
};
