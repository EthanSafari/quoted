import { auth, firestoreDb } from '@/src/firebase/clientApp';
import SendOutlinedIcon from '@mui/icons-material/Send';
import { BottomNavigation, Box, IconButton, TextField, Typography } from "@mui/material";
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

function generateFirestoreId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let autoId = '';
    for (let i = 0; i < 20; i++) {
        autoId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    //assert(autoId.length === 20, 'Invalid auto ID: ' + autoId);
    return autoId;
}

export default function Footer() {
    const [user, loading, error] = useAuthState(auth);
    const [userMessage, setUserMessage] = useState({
        id: generateFirestoreId(),
        message: '',
        author: user.uid,
        createdAt: new Date().toJSON(),
        createdAtGoogle: serverTimestamp(),
    });
    const [err, setErr] = useState('');
    const sendNewMessage = async (e) => {
        e.preventDefault();
        setErr('');
        try {
            const trimmedMessage = userMessage.message.trim();
            if (trimmedMessage.length < 10 || trimmedMessage.length > 100)
                throw new Error('QUOTES MUST BE BETWEEN 10 AND 100 CHARACTERS IN LENGTH');
            const messageDocRef = doc(firestoreDb, "messages", userMessage.id);
            await setDoc(messageDocRef, userMessage);
            // dispatch(addMessage(userMessage));
        } catch (error) {
            setErr(error.message)
            return;
        };
        setUserMessage({
            id: generateFirestoreId(),
            message: '',
            author: user.uid,
            createdAt: new Date().toJSON(),
            createdAtGoogle: serverTimestamp(),
        });
    };
    const onChange = (e) => {
        setUserMessage((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const footerDesign = {
        position: 'fixed',
        bottom: 0,
        borderTop: '1px solid rgba(1, 1, 1, .7)',
        width: 1.0,
        padding: '10px',
        height: 'fit-content',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    };
    const textboxDesign = {
        width: '80vw'
    };
    const sendButtonDesign = {
        // marginLeft: '2px'
    };
    return (
        <BottomNavigation
            sx={footerDesign}
        >
            {err.length > 0 && (
                <Typography
                    align="center"
                    sx={{
                        color: 'red',
                        fontSize: '12px',
                        marginBottom: '10px'
                    }}
                >
                    {err}
                </Typography>
            )}
            <Box
            >
                <form
                    onSubmit={sendNewMessage}
                    style={{
                        display: 'flex',
                    }}
                >
                    <TextField
                        label="Care to Share?"
                        multiline
                        sx={textboxDesign}
                        value={userMessage.message}
                        name='message'
                        onChange={onChange}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <IconButton
                            color='secondary'
                            type='submit'
                            sx={{
                                paddingBottom: 0
                            }}
                        >
                            <SendOutlinedIcon
                                fontSize='large'
                                sx={sendButtonDesign}
                            />
                        </IconButton>
                        <Typography
                            align='center'
                        >
                            {userMessage.message.trim().length}
                        </Typography>
                    </Box>
                </form>
            </Box>
        </BottomNavigation>
    );
}
