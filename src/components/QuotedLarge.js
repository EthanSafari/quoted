import { Container, Typography } from "@mui/material";
import { Advent_Pro } from '@next/font/google';
import { ChatBubbleOutlineOutlined } from "@mui/icons-material";

const quotedTitle = Advent_Pro({
    subsets: ['latin'],
    weight: ['600'],
});

export default function QuotedLarge() {
    const logoDesign = {
        display: 'flex',
        justifyContent: 'center',
    };
    const chatBubbleDesign = {
        margin: '8px 0 0 2px',
    };
    return (
    <Container sx={logoDesign}>
        <Typography variant="h2" className={quotedTitle.className}>
            Quoted
        </Typography>
        <ChatBubbleOutlineOutlined fontSize="large" sx={chatBubbleDesign} />
    </Container>
    )
}
