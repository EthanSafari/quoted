import { Box, Button, Divider } from "@mui/material";
import { auth } from "../../firebase/clientApp";
import { useSignInWithApple, useSignInWithGoogle } from "react-firebase-hooks/auth";
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function OAuthButtons() {
    const router = useRouter();
    // const [signInWithApple, appleUser, appleLoading, appleError] = useSignInWithApple(auth);
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    useEffect(() => {
        if (googleUser)
            router.push('/home');
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
                sizeLarge
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
