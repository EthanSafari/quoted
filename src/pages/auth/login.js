import LandingPageText from "@/src/components/LoggedOut/LandingPageText";
import OAuthButtons from "@/src/components/LoggedOut/OAuthButtons";
import QuotedLarge from "@/src/components/LoggedOut/QuotedLarge";
import { auth } from "@/src/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/src/firebase/errors";
import { LoadingButton } from "@mui/lab";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

export default function LoginPage() {
    const router = useRouter();
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    useEffect(() => {
        if (user)
            router.push('/');
    }, [user]);

    const loginPageDesign = {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    };
    const formDesign = {
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    };
    const formStyle = {
        width: '70vw',
        maxWidth: '270px',
    };
    const submitDesign = {
        marginTop: '20px',
    };
    const linkSentance = {
        marginTop: '15px',
        fontSize: '14px',
    };
    const linkText = {
        textDecoration: 'none',
        color: '#3366cc',
        display: 'flex',
        justifyContent: 'center',
        fontSize: '14px',
    };
    const errorText = {
        color: 'red',
        fontSize: '12px',
    };
    const onChange = (e) => {
        setLoginForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const onSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(loginForm.email, loginForm.password);
    };
    const login = 'WELCOME BACK!';
    return (
        <Box sx={loginPageDesign}>
            <QuotedLarge />
            <LandingPageText text={login} />
            <Box sx={formDesign}>
                <FormControl>
                    <form style={formStyle} onSubmit={onSubmit}>
                        {(error) && (
                            <Typography
                                align="center"
                                gutterBottom
                                sx={errorText}
                            >
                                {FIREBASE_ERRORS[error.message].toUpperCase()}
                            </Typography>
                        )}
                        <TextField
                            required
                            label="EMAIL"
                            defaultValue={loginForm.email}
                            fullWidth
                            onChange={onChange}
                            name="email"
                            type="email"
                        />
                        <TextField
                            required
                            label="PASSWORD"
                            defaultValue={loginForm.password}
                            fullWidth
                            margin="normal"
                            name="password"
                            type="password"
                            onChange={onChange}
                        />
                        {!loading ? (
                        <Button
                            variant="contained"
                            fullWidth
                            sx={submitDesign}
                            type="submit"
                        >
                            LOG IN
                        </Button>
                        ) : (
                            <LoadingButton
                            fullWidth
                            sx={submitDesign}
                        >
                            LOG IN
                        </LoadingButton>
                        )}
                        <Typography align="center" sx={linkSentance}>
                            DONT HAVE AN ACCOUNT?
                        </Typography>
                        <Link href={'/auth/signup'} style={linkText}>
                            SIGN UP HERE
                        </Link>
                    </form>
                </FormControl>
            </Box>
        </Box>
    )
}
