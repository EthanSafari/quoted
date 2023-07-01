import LandingPageText from "@/src/components/LandingPageText";
import QuotedLarge from "@/src/components/QuotedLarge";
import { Box, Button, FormControl, TextField } from "@mui/material";
import { useState } from "react";

export default function LoginPage() {
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });
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
    const submitDesign ={
        marginTop: '20px',
    };
    const signup = 'WELCOME BACK!';
    return (
        <Box sx={signupPageDesign}>
            <QuotedLarge />
            <LandingPageText text={signup} />
            <Box sx={formDesign}>
                <FormControl>
                    <form style={formStyle}>
                        <TextField
                            required
                            label="EMAIL"
                            defaultValue={loginForm.email}
                            fullWidth
                        />
                        <TextField
                            required
                            label="PASSWORD"
                            defaultValue={loginForm.password}
                            fullWidth
                            margin="normal"
                        />
                        <Button
                            variant="contained"
                            fullWidth
                            sx={submitDesign}
                        >
                            LOGIN
                        </Button>
                    </form>
                </FormControl>
            </Box>
        </Box>
    )
}
