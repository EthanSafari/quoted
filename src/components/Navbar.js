import { AppBar, Toolbar, Typography } from "@mui/material";
import { Advent_Pro } from '@next/font/google';

const quotedTitle = Advent_Pro({
    subsets: ['latin'],
    weight: ['600'],
});

export default function Navbar() {
    const toolbarDesign = {
        display: 'flex',
        justifyContent: 'space-between'
    };
    return (
        <AppBar>
            <Toolbar sx={toolbarDesign}>
                <Typography variant="h4" className={quotedTitle.className}>
                    Quoted
                </Typography>
            </Toolbar>
        </AppBar>
    )
};
