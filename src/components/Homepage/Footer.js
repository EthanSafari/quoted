import { auth, firestoreDb } from '@/src/firebase/clientApp';
import { addMessage } from '@/src/store/message';
import SendOutlinedIcon from '@mui/icons-material/Send';
import { BottomNavigation, IconButton, TextField, Typography } from "@mui/material";
import { doc, runTransaction, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch } from 'react-redux';

function generateFirestoreId(){
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let autoId = '';
    for (let i = 0; i < 20; i++) {
        autoId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    //assert(autoId.length === 20, 'Invalid auto ID: ' + autoId);
    return autoId;
}

export default function Footer() {
    const dispatch = useDispatch();
    const [user, loading, error] = useAuthState(auth);
    const [userMessage, setUserMessage] = useState({
        id: generateFirestoreId(),
        message: '',
        author: user.uid,
        createdAt: new Date().toString(),
        createdAtGoogle: serverTimestamp(),
    });
    const [err, setErr] = useState('');
    const sendNewMessage = async (e) => {
        e.preventDefault();
        setErr('');
        try {
            const messageDocRef = doc(firestoreDb, "messages", userMessage.id);
            const userDocRef = doc(firestoreDb, "users", user.uid);
            const userMessageInfo = {
                author: user.uid,
                username: user.displayName,
                userProfileImageUrl: user.photoURL,
            };
            await runTransaction(firestoreDb, async (transaction) => {
                // const messageDoc = await transaction.get(messageDocRef);
                transaction.set(messageDocRef, userMessage);
                transaction.set(doc(firestoreDb, `users/${user.uid}/messageSnippets`, userMessage.id), userMessage);
                transaction.set(userDocRef, userMessageInfo);
                transaction.set(doc(firestoreDb, `messages/${userMessage.id}/userSnippets`, user.uid), userMessageInfo);
                dispatch(addMessage(userMessage));
            })
        } catch (error) {
            console.log(error)
            setErr(error.message)
            return;
        };
        setUserMessage({
            id: generateFirestoreId(),
            message: '',
            author: user.uid,
            createdAt: new Date().toDateString(),
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
