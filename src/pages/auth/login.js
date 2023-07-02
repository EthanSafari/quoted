import LandingPageText from "@/src/components/LandingPageText";
import QuotedLarge from "@/src/components/QuotedLarge";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });
    const [formError, setFormError] = useState('');
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
    const onChange = (e) => {
        setLoginForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const login = 'WELCOME BACK!';
    return (
        <Box sx={loginPageDesign}>
            <QuotedLarge />
            <LandingPageText text={login} />
            <Box sx={formDesign}>
                <FormControl>
                    <form style={formStyle}>
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
                        <Button
                            variant="contained"
                            fullWidth
                            sx={submitDesign}
                            type="submit"
                        >
                            LOGIN
                        </Button>
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
