import SendOutlinedIcon from '@mui/icons-material/Send';
import { BottomNavigation, IconButton, TextField } from "@mui/material";

export default function Footer() {
    const footerDesign = {
        position: 'fixed',
        bottom: 0,
        borderTop: '1px solid rgba(1, 1, 1, .7)',
        width: 1.0,
        padding: '10px',
        height: 'fit-content',
        display: 'flex',
        alignItems: 'center'
    };
    const textboxDesign = {
        width: '65vw'
    };
    const sendButtonDesign = {

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
            <IconButton
                color='secondary'
            >
                <SendOutlinedIcon
                    fontSize='large'
                    sx={sendButtonDesign}
                />
            </IconButton>
        </BottomNavigation>
    );
}
