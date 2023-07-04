import LoggedinHomepage from "./home";
import { auth } from "../firebase/clientApp";
import { useAuthState } from 'react-firebase-hooks/auth';import LandingPage from "./landing";
import { useRouter } from "next/router";
;

export default function Home() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  return (
    <>
      {user ? <LoggedinHomepage /> : <LandingPage />}
    </>
  )
};
