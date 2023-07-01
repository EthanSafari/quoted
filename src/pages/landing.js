import { Box, Button, Container, Typography } from "@mui/material";
import { Advent_Pro, Anek_Gurmukhi } from '@next/font/google';
import { ChatBubbleOutlineOutlined } from "@mui/icons-material";
import LandingPageText from "../components/LandingPageText";
import ContainedButton from "../components/ContainedButton";

const quotedTitle = Advent_Pro({
    subsets: ['latin'],
    weight: ['600'],
});

export default function LandingPage() {
    const logoDesign = {
        display: 'flex',
        justifyContent: 'center',
    };
    const chatBubbleDesign = {
        margin: '8px 0 0 2px',
    };
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
        maxWidth: '240px'
    };
    const welcome = 'WELCOME TO';
    const slogan = 'A PLACE TO SHARE YOUR THOUGHTS...';
    const loginText = 'LOGIN';
    const signupText= 'SIGNUP';
    return (
        <Box sx={landingDesign}>
            <Box>
                <LandingPageText text={welcome} />
                <Container sx={logoDesign}>
                    <Typography variant="h2" className={quotedTitle.className}>
                        Quoted
                    </Typography>
                    <ChatBubbleOutlineOutlined fontSize="large" sx={chatBubbleDesign} />
                </Container>
                <LandingPageText text={slogan} />
            </Box>
            <Container sx={buttonContainer}>
                <ContainedButton text={loginText} />
                <ContainedButton text={signupText} />
            </Container>
        </Box>
    )
}
