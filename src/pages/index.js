import LoggedinHomepage from "../components/LoggedIn/LoggedInHomepage";
import { auth } from "../firebase/clientApp";
import { useAuthState } from 'react-firebase-hooks/auth';import LandingPage from "../components/LoggedOut/LandingPage";
import { useRouter } from "next/router";
;

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  return (
    <>
      {user ? <LoggedinHomepage /> : <LandingPage />}
    </>
  )
};
