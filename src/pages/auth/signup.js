import ContainedButton from "@/src/components/ContainedButton";
import LandingPageText from "@/src/components/LandingPageText";
import QuotedLarge from "@/src/components/QuotedLarge";
import { Box, Button, Container, FormControl, TextField } from "@mui/material";
import { useState } from "react";

export default function SignUpPage() {
    const [signupForm, setSignupForm] = useState({
        email: "",
        password: "",
        confirmPassword: ""
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
    const signup = 'SIGNUP';
    return (
        <Box sx={signupPageDesign}>
            <QuotedLarge />
            {/* <LandingPageText text={signup} /> */}
            <Box sx={formDesign}>
                <FormControl>
                    <form style={formStyle}>
                        <TextField
                            required
                            label="EMAIL"
                            defaultValue={signupForm.email}
                            fullWidth
                        />
                        <TextField
                            required
                            label="PASSWORD"
                            defaultValue={signupForm.password}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            required
                            label="CONFIRM PASSWORD"
                            defaultValue={signupForm.confirmPassword}
                            fullWidth
                        />
                        <Button
                            variant="contained"
                            fullWidth
                            sx={submitDesign}
                        >
                            SIGNUP
                        </Button>
                    </form>
                </FormControl>
            </Box>
        </Box>
    )
}
