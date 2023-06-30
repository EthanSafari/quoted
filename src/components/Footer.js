import { BottomNavigation, TextField } from "@mui/material";

export default function Footer() {
    const footerDesign = {
        position: 'fixed',
        bottom: 0,
        borderTop: '1px solid darkgrey',
        width: 1.0,
        padding: '10px',
        height: 'fit-content',
    };
    const textboxDesign = {
        width: '70vw'
    };
    return (
        <BottomNavigation
            sx={footerDesign}
        >
            <TextField
            label="Have a thought?"
            variant="standard"
            multiline
            sx={textboxDesign}
            />
        </BottomNavigation>
    );
}
