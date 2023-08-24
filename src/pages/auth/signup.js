import LandingPageText from "@/src/components/LoggedOut/LandingPageText";
import QuotedLarge from "@/src/components/LoggedOut/QuotedLarge";
import { auth, firestoreDb } from "@/src/firebase/clientApp";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect, useState } from "react";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { FIREBASE_ERRORS } from "@/src/firebase/errors";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import OAuthButtons from "@/src/components/LoggedOut/OAuthButtons";

export default function SignUpPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [signupForm, setSignupForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [formError, setFormError] = useState('');
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    useEffect(() => {
        if (user) {
            createUserDoc(user);
            router.push('/user/newuser');
        }
    }, [user]);

    const createUserDoc = async (user) => {
        const userDocRef = doc(firestoreDb, 'users', user.user.uid);
        await setDoc(userDocRef, {
            id: user.user.uid,
            username: user.user.email.split('@')[0],
            email: user.user.email,
            profilePhotoUrl: "",
            createdAt: user.user.metadata.creationTime,
        });
    }

    const signupPageDesign = {
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
    const errorText = {
        color: 'red',
        fontSize: '12px',
        marginBottom: '10px'
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

    const onChange = (e) => {
        setSignupForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            setFormError('');
            if (signupForm.email.trim().length < 7)
                throw new Error('PLEASE ENTER A VALID EMAIL');
            if (signupForm.password.length < 6 || signupForm.password.length > 30)
                throw new Error('PASSWORDS SHOULD BE BETWEEN 6 AND 30 CHARACTERS IN LENGTH')
            if (signupForm.password !== signupForm.confirmPassword)
                throw new Error('PASSWORDS DO NOT MATCH');
            await createUserWithEmailAndPassword(signupForm.email, signupForm.password);
            if (error)
                throw new Error(FIREBASE_ERRORS[error.message]);
        } catch (error) {
            setFormError(FIREBASE_ERRORS[error.message] || error.message);
            return;
        }
        setSignupForm({
            email: "",
            password: "",
            confirmPassword: "",
            username: "",
        });
    };
    const signup = 'THINK FREELY, SHARE FREELY';
    return (
        <Box sx={signupPageDesign}>
            <QuotedLarge />
            <LandingPageText text={signup} />
            <Box sx={formDesign}>
                <FormControl>
                    <form style={formStyle} onSubmit={onSubmit}>
                        {(formError || error) && (
                            <Typography
                                align="center"
                                gutterBottom
                                sx={errorText}
                            >
                                {FIREBASE_ERRORS[error?.message] || formError}
                            </Typography>
                        )}
                        <TextField
                            required
                            label="EMAIL"
                            value={signupForm.email}
                            fullWidth
                            name="email"
                            type="email"
                            onChange={onChange}
                            margin="normal"
                        />
                        <TextField
                            required
                            label="PASSWORD"
                            defaultValue={""}
                            value={signupForm.password}
                            fullWidth
                            margin="normal"
                            name="password"
                            type="password"
                            onChange={onChange}
                        />
                        <TextField
                            required
                            margin="normal"
                            label="CONFIRM PASSWORD"
                            value={signupForm.confirmPassword}
                            fullWidth
                            name="confirmPassword"
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
                                SIGN UP
                            </Button>
                        ) : (
                            <LoadingButton
                                fullWidth
                                sx={submitDesign}
                            >
                                SIGN UP
                            </LoadingButton>
                        )}
                    </form>
                </FormControl>
            // <OAuthButtons />
                <Typography align="center" sx={linkSentance}>
                    HAVE AN ACCOUNT?
                </Typography>
                <Link href={'/auth/login'} style={linkText}>
                    LOG IN HERE
                </Link>
            </Box>
        </Box>
    )
}
