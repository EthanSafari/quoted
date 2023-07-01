import LandingPageText from "@/src/components/LandingPageText";
import QuotedLarge from "@/src/components/QuotedLarge";
import { Box, Button, FormControl, TextField } from "@mui/material";
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
    const onChange = (e) => {
        setSignupForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const signup = 'THINK FREELY, QUOTE FREELY';
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
                            defaultValue={""}
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
                            defaultValue={""}
                            value={signupForm.confirmPassword}
                            fullWidth
                            name="confirmPassword"
                            type="password"
                            onChange={onChange}
                        />
                        <Button
                            variant="contained"
                            fullWidth
                            sx={submitDesign}
                            type="submit"
                        >
                            SIGNUP
                        </Button>
                    </form>
                </FormControl>
            </Box>
        </Box>
    )
}
