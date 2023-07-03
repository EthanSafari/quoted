import { Container, Typography } from "@mui/material";
import { Advent_Pro } from '@next/font/google';
import { ChatBubbleOutlineOutlined } from "@mui/icons-material";
import Link from "next/link";

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
    const linkStyle = {
        textDecoration: 'none',
        color: 'black',
    };
    return (
        <Container sx={logoDesign}>
            <Link href={'/'} style={linkStyle}>
                <Typography variant="h2" className={quotedTitle.className}>
                    Quoted
                </Typography>
            </Link>
            <ChatBubbleOutlineOutlined fontSize="large" sx={chatBubbleDesign} />
        </Container>
    )
}
