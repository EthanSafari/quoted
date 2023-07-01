import { Box, ButtonGroup, Container } from "@mui/material";
import LandingPageText from "../components/LandingPageText";
import ContainedButton from "../components/ContainedButton";
import QuotedLarge from "../components/QuotedLarge";

export default function LandingPage() {
    const landingDesign = {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    };
    const buttonContainer = {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: '30px',
        width: '70vw',
        maxWidth: '240px',
    };
    const welcome = 'WELCOME TO';
    const slogan = 'A PLACE TO SHARE YOUR THOUGHTS...';
    const loginText = 'LOGIN';
    const signupText = 'SIGNUP';
    return (
        <Box sx={landingDesign}>
            <Box>
                <LandingPageText text={welcome} />
                <QuotedLarge />
                <LandingPageText text={slogan} />
            </Box>
            <Container sx={buttonContainer}>
                <ButtonGroup
                    orientation="vertical"
                    size="large"
                >
                    <ContainedButton text={loginText} />
                    <ContainedButton text={signupText} />
                </ButtonGroup>
            </Container>
        </Box>
    )
}
