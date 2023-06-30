import { AppBar, Toolbar, Typography } from "@mui/material"

export default function Navbar() {
    const toolbarDesign = {
        display: 'flex',
        justifyContent: 'space-between'
    };
    return (
        <AppBar>
            <Toolbar sx={toolbarDesign}>
                <Typography variant="h5">
                    Quoted
                </Typography>
            </Toolbar>
        </AppBar>
    )
};
