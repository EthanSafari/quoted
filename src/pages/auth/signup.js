import LandingPageText from "@/src/components/LandingPageText";
import QuotedLarge from "@/src/components/QuotedLarge";
import { auth } from "@/src/firebase/clientApp";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect, useState } from "react";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { FIREBASE_ERRORS } from "@/src/firebase/errors";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SignUpPage() {
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
        if (user)
            router.push('/user/newuser');
    }, [user]);

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
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            setFormError('');
            if (signupForm.password !== signupForm.confirmPassword)
                throw new Error('PASSWORDS DO NOT MATCH');
            await createUserWithEmailAndPassword(signupForm.email, signupForm.password);
            if (error) throw new Error(FIREBASE_ERRORS[error.message]);
        } catch (error) {
            setFormError(error.message);
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
                        {(formError) && (
                            <Typography
                                align="center"
                                gutterBottom
                                sx={errorText}
                            >
                                {formError}
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
                            value={signupForm.password}
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
