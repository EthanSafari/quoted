import SendOutlinedIcon from '@mui/icons-material/Send';
import { BottomNavigation, IconButton, TextField } from "@mui/material";
import { useState } from 'react';

export default function Footer() {
    const [userMessage, setUserMessage] = useState('');
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
        width: '80vw'
    };
    const sendButtonDesign = {
        // marginLeft: '2px'
    };
    console.log(userMessage)
    return (
        <BottomNavigation
            sx={footerDesign}
        >
            <form>
                <TextField
                    label="Care to Share?"
                    multiline
                    sx={textboxDesign}
                    value={userMessage}
                    onChange={e => setUserMessage(e.target.value)}
                />
                <IconButton
                    color='secondary'
                >
                    <SendOutlinedIcon
                        fontSize='large'
                        sx={sendButtonDesign}
                    />
                </IconButton>
            </form>
        </BottomNavigation>
    );
}
