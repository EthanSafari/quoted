import LandingPageText from "@/src/components/LandingPageText";
import QuotedLarge from "@/src/components/QuotedLarge";
import { auth } from "@/src/firebase/clientApp";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { FIREBASE_ERRORS } from "@/src/firebase/errors";
import Link from "next/link";

export default function SignUpPage() {
    const [signupForm, setSignupForm] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [formError, setFormError] = useState('');
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
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
    const onSubmit = (e) => {
        e.preventDefault();
        if (signupForm.password !== signupForm.confirmPassword) {
            setFormError('PASSWORDS DO NOT MATCH');
            return;
        };
        createUserWithEmailAndPassword(signupForm.email, signupForm.password);
        setSignupForm({
            email: "",
            password: "",
            confirmPassword: ""
        });
        setFormError('');
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
                                {formError
                                    || FIREBASE_ERRORS[error.message].toUpperCase()}
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
                        />
                        <TextField
                            required
                            label="PASSWORD"
                            defaultValue={""}
                            fullWidth
                            margin="normal"
                            name="password"
                            type="password"
                            onChange={onChange}
                        />
                        <TextField
                            required
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
                                SIGNUP
                            </Button>
                        ) : (
                            <LoadingButton
                                fullWidth
                                sx={submitDesign}
                            >
                                SIGNUP
                            </LoadingButton>
                        )}
                    </form>
                </FormControl>
                <Typography align="center" sx={linkSentance}>
                    HAVE AN ACCOUNT?
                </Typography>
                <Link href={'/auth/login'} style={linkText}>
                    LOGIN HERE
                </Link>
            </Box>
        </Box>
    )
}
