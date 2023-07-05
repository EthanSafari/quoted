import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { Advent_Pro } from '@next/font/google';
import MenuIcon from '@mui/icons-material/Menu';
import { ChatBubbleOutlineOutlined } from "@mui/icons-material";
import { useContext } from "react";
import { PageContext } from "../../context/PageContext";

const quotedTitle = Advent_Pro({
    subsets: ['latin'],
    weight: ['600'],
});

export default function Navbar() {
    const { pageNumber, setPageNumber } = useContext(PageContext);
    const toolbarDesign = {
        display: 'flex',
        justifyContent: 'space-between'
    };
    const logoDesign = {
        display: 'flex',
    };
    const chatBubbleDesign = {
        margin: '3px 0 0 2px',
    };
    return (
        <AppBar>
            <Toolbar sx={toolbarDesign}>
                <IconButton size="medium" color="secondary">
                    <MenuIcon
                    fontSize="large"
                    onClick={() => setPageNumber(pageNumber === 1 ? 2 : pageNumber === 3 ? 2 : 1)}
                    />
                </IconButton>
                <Box sx={logoDesign}>
                    <Typography variant="h4" className={quotedTitle.className}>
                        Quoted
                    </Typography>
                    <ChatBubbleOutlineOutlined fontSize="medium" sx={chatBubbleDesign} />
                </Box>
            </Toolbar>
        </AppBar>
    )
};