import { Avatar, Box, ButtonGroup, Container, Divider, List, ListItem, Typography } from "@mui/material";
import LandingPageText from "./LandingPageText";
import ContainedButton from "./ContainedButton";
import QuotedLarge from "./QuotedLarge";
import OAuthButtons from "./OAuthButtons";
import { useSelector } from "react-redux";
import { Anek_Gurmukhi } from '@next/font/google';

const quotedSlogan = Anek_Gurmukhi({
    subsets: ['latin'],
    weight: ['200'],
});


export default function LandingPage() {
    const randomQuote = useSelector(state => {
        const quoteArr = Object.values(state.messages.messages);
        return quoteArr[Math.floor(Math.random() * quoteArr.length)]
    });
    const allUsers = useSelector(state => state.users.users);
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
        marginTop: '50px',
        alignItems: 'center'
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
            {/* <Container>
                <OAuthButtons />
            </Container> */}
            {randomQuote && (
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                    mt={4}
                >
                    <Divider
                        sx={{
                            width: '70vw',
                            color: 'black',
                            maxWidth: '325px'
                        }}
                    />
                    <Typography
                        width={'70vw'}
                        maxWidth={'325px'}
                        align="center"
                        mt={2}
                        className={quotedSlogan.className}
                    >
                        JOIN TO VIEW QUOTES LIKE:
                    </Typography>
                    <Box
                        display={'flex'}
                        // border={'1px solid black'}
                        p={2}
                        width={'70vw'}
                        maxWidth={'350px'}
                        borderRadius={'3px'}
                        mt={1}
                        boxShadow={'0 2px 3px rgba(1, 1, 1, .3)'}
                        sx={{ backgroundColor: 'whitesmoke' }}
                    >
                        <Avatar
                            src={allUsers[randomQuote.author]?.profilePhotoUrl}
                            sx={{
                                width: 60,
                                height: 60,
                                marginRight: '15px',
                                border: '1px solid black'
                            }}
                        />
                        <Box
                            display={'flex'}
                            flexDirection={'column'}
                            alignItems={'center'}
                        >
                            <Typography>
                                "{randomQuote.message}"
                            </Typography>
                            <Typography>
                                - {allUsers[randomQuote.author]?.username} -
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    )
}
