import { Container, Typography } from "@mui/material";
import { Anek_Gurmukhi } from '@next/font/google';

const quotedSlogan = Anek_Gurmukhi({
    subsets: ['latin'],
    weight: ['300'],
});

export default function LandingPageText({ text }) {
    const sloganDesign = {
        display: 'flex',
        justifyContent: 'center',
    };
    return (
        <Container sx={sloganDesign}>
            <Typography className={quotedSlogan.className}>
                {text}
            </Typography>
        </Container>
    )
};
