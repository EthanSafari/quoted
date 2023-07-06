import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { Advent_Pro } from '@next/font/google';
import MenuIcon from '@mui/icons-material/Menu';
import { ChatBubbleOutlineOutlined } from "@mui/icons-material";
import { useContext } from "react";
import { PageContext } from "../../context/PageContext";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const quotedTitle = Advent_Pro({
    subsets: ['latin'],
    weight: ['600'],
});


export default function Navbar() {
    const { pageNumber, setPageNumber } = useContext(PageContext);
    const setPage = (page) => {
        if (page === 1) setPageNumber(2);
        else if (page === 3) setPageNumber(2);
        else if (page === 4) setPageNumber(2);
        else setPageNumber(1);
    };
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
                    {pageNumber === 1 ? (
                        <MenuIcon
                            fontSize="large"
                            onClick={() => setPage(pageNumber)}
                        />
                    ) : (
                        <ArrowBackIcon
                            fontSize="large"
                            onClick={() => setPage(pageNumber)}
                        />
                    )}
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
