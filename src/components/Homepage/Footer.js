import { auth, firestoreDb } from '@/src/firebase/clientApp';
import SendOutlinedIcon from '@mui/icons-material/Send';
import { BottomNavigation, IconButton, TextField, Typography } from "@mui/material";
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Footer() {
    const [user, loading, error] = useAuthState(auth);
    const [userMessage, setUserMessage] = useState({
        message: '',
        author: user.uid,
        createdAt: serverTimestamp(),
    });
    console.log(userMessage)
    const [err, setErr] = useState('');
    const sendNewMessage = async (e) => {
        e.preventDefault();
        setErr('');
        try {
            // const messageDocRef = doc(firestoreDb, 'messages');
            await addDoc(collection(firestoreDb, 'messages'), userMessage);
        } catch (error) {
            setErr(error.message)
            return;
        };
        setUserMessage({
            message: '',
            author: user.uid,
            createdAt: serverTimestamp(),
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
                <Typography>
                    {err}
                </Typography>
            )}
            <form
            onSubmit={sendNewMessage}
            >
                <TextField
                    label="Care to Share?"
                    multiline
                    sx={textboxDesign}
                    value={userMessage.message}
                    name='message'
                    onChange={onChange}
                />
                <IconButton
                    color='secondary'
                    type='submit'
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
