import { Box, Button, Divider } from "@mui/material";
import { auth, firestoreDb } from "../../firebase/clientApp";
import { useSignInWithApple, useSignInWithGoogle } from "react-firebase-hooks/auth";
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import { useEffect } from "react";
import { useRouter } from "next/router";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function OAuthButtons() {
    const router = useRouter();
    // const [signInWithApple, appleUser, appleLoading, appleError] = useSignInWithApple(auth);
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    useEffect(() => {
        if (googleUser) {
            createUserDoc(googleUser.user);
        }
    }, [googleUser]);
    const oauthBoxDesign = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };
    const buttonDesign = {
        maxWidth: '220px',
        marginTop: '5px',
        width: '220px'
    }
    const createUserDoc = async (user) => {
        const userDocRef = doc(firestoreDb, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            console.log({message: 'User already exists. Logging in registered user.'});
            router.push('/');
            return;
        } else {
            await setDoc(userDocRef, {
                id: user.uid,
                username: user.displayName,
                email: user.email,
                profilePhotoUrl: user.photoURL,
                createdAt: user.metadata.creationTime,
            });
            console.log({message: 'User does not exist. Creating new user.'})
            router.push('/');
            return;
        };
    }
    return (
        <Box
            mt={1}
            sx={oauthBoxDesign}
        >
            <Divider
                sx={{
                    width: '220px',
                    margin: '5px 0',
                    color: 'black'
                }}
            >
                OR
            </Divider>
            <Button
                variant="contained"
                color="secondary"
                sx={buttonDesign}
                onClick={() => {
                    signInWithGoogle();
                }}
            >
                <GoogleIcon style={{ marginRight: '10px' }} />
                Sign in with Google
            </Button>
            {/* <Button
                variant="contained"
                color="secondary"
                sizeLarge
                sx={buttonDesign}
                onClick={() => signInWithApple()}
            >
                <AppleIcon style={{ marginRight: '10px' }} />
                Sign in with Apple
            </Button> */}
        </Box>
    )
}
