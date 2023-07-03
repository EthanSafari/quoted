import { Box, ButtonGroup, Container } from "@mui/material";
import LandingPageText from "./LandingPageText";
import ContainedButton from "./ContainedButton";
import QuotedLarge from "./QuotedLarge";
import OAuthButtons from "./OAuthButtons";

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
    const loginText = 'LOG IN';
    const signupText = 'SIGN UP';
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
                    <ContainedButton text={loginText} link={'/auth/login'} />
                    <ContainedButton text={signupText} link={'/auth/signup'} />
                </ButtonGroup>
            </Container>
            <Container>
                <OAuthButtons />
            </Container>
        </Box>
    )
}
