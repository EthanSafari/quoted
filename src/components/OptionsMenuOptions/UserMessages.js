import { auth, firestoreDb } from "@/src/firebase/clientApp";
import { BottomNavigation, Box, Button, ButtonGroup, Chip, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import EditNoteIcon from '@mui/icons-material/EditNote';
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

export default function UserMessages() {
    const [user] = useAuthState(auth);
    const userMessages = useSelector(state => {
        const stateQuotes = state.messages.messages;
        const quotesArr = Object.values(stateQuotes).filter(message => message.author === user.uid);
        const sortedQuotes = quotesArr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return sortedQuotes;
    });
    const [editOptions, setEditOptions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [updateQuote, setUpdateQuote] = useState(false);
    const [deleteQuote, setDeleteQuote] = useState(false);
    const [err, setErr] = useState('');
    const [selectedQuote, setSelectedQuote] = useState({
        createdAtGoogle: { seconds: 0, nanoseconds: 0 },
        message: '',
        author: '',
        id: '',
        createdAt: ''
    });
    const onChange = (e) => {
        setSelectedQuote((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const deleteSelectedQuote = async () => {
        setErr('');
        try {
            const selectedQuoteRef = doc(firestoreDb, 'messages', selectedQuote.id);
            await deleteDoc(selectedQuoteRef);
            setDeleteQuote(false);
            setEditOptions(false);
            setSelectedQuote({
                createdAtGoogle: { seconds: 0, nanoseconds: 0 },
                message: '',
                author: '',
                id: '',
                createdAt: ''
            });
        } catch (error) {
            setErr(error.message);
            return;
        }
    };
    const updateSelectedQuote = async (e) => {
        e.preventDefault();
        setErr('');
        try {
            const trimmedMessage = selectedQuote.message.trim();
            if (trimmedMessage.length < 10 || trimmedMessage.length > 100)
                throw new Error('QUOTES MUST BE BETWEEN 10 AND 100 CHARACTERS IN LENGTH');
            const selectedQuoteRef = doc(firestoreDb, 'messages', selectedQuote.id);
            await updateDoc(selectedQuoteRef, selectedQuote);
            setEditOptions(false);
        } catch (error) {
            console.log(error);
            setErr(error.message);
            return;
        }
    };
    const bottomNav = {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        borderTop: '1px solid black',
        display: 'flex',
        flexDirection: 'column',
        height: 'fit-content'
    };
    const editBoxDesign = {
        // borderTop: '1px solid grey',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px 0',
    };
    const textboxDesign = {
        width: '80vw'
    };
    return (
        <Box mt={10} mb={10}>
            <Typography
                variant="h5"
                align="center"
                mb={2}
                fontWeight={700}
            >
                YOUR QUOTES
            </Typography>
            <Divider>
                <Chip label={userMessages.length ? 'SELECT ON AN QUOTE FOR OPTIONS' : 'LOOKS LIKE YOU HAVE NO QUOTES!'} />
            </Divider>
            <List>
                {userMessages.map((message, i) => (
                    <ListItemButton
                        key={i}
                        fullWidth
                        alignItems='center'
                        divider
                        selected={selectedIndex === i}
                        onClick={() => {
                            setEditOptions(!editOptions);
                            setSelectedIndex(selectedIndex !== i ? i : null);
                            setSelectedQuote(message);
                        }}
                    >
                        <ListItemText
                            sx={{ padding: '5px 10px' }}
                            primary={`"${message.message}"`}
                            secondary={new Date(message.createdAt).toDateString()}
                        />
                    </ListItemButton>
                ))}
            </List>
            {editOptions &&
                <BottomNavigation
                    sx={bottomNav}
                >
                    <Typography
                        align="center"
                        variant="h6"
                        sx={{
                            borderBottom: '1px solid grey',
                            padding: '10px 2vw',
                        }}
                    >
                        {
                            selectedQuote.message.length > 0 ?
                                selectedQuote.message : (
                                    <Typography
                                        color={'warning'}
                                    >

                                        NEW QUOTE CANNOT BE LEFT BLANK
                                    </Typography>
                                )
                        }
                    </Typography>
                    <ButtonGroup
                        size="large"
                        variant="text"
                        color="secondary"
                        fullWidth
                    >
                        {!deleteQuote &&
                            <Button
                                onClick={() => setUpdateQuote(!updateQuote)}
                            >
                                UPDATE
                            </Button>
                        }
                        {!updateQuote &&
                            <Button
                                color="warning"
                                onClick={() => {
                                    setErr('');
                                    setDeleteQuote(!deleteQuote);
                                }}
                            >
                                DELETE
                            </Button>
                        }
                    </ButtonGroup>
                    {updateQuote &&
                        <Box
                            sx={editBoxDesign}
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
                            <form
                                onSubmit={updateSelectedQuote}
                                style={{
                                    display: 'flex',
                                }}
                            >
                                <TextField
                                    label="Want to Update?"
                                    multiline
                                    sx={textboxDesign}
                                    value={selectedQuote.message}
                                    name='message'
                                    onChange={onChange}
                                />
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Button
                                        color='secondary'
                                        type='submit'
                                        sx={{
                                            paddingBottom: 0
                                        }}
                                    >
                                        <EditNoteIcon
                                            fontSize='large'
                                        />
                                    </Button>
                                    <Typography
                                        align='center'
                                    >
                                        {selectedQuote.message.trim().length}
                                    </Typography>
                                </Box>
                            </form>
                        </Box>
                    }
                    {deleteQuote &&
                        <Box
                            sx={editBoxDesign}
                        >
                            <Typography
                                align="center"
                                sx={{
                                    color: 'red',
                                    fontWeight: '600'
                                }}
                            >
                                ARE YOU SURE YOU WANT TO DELETE THIS QUOTE?
                            </Typography>
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
                            <ButtonGroup
                                fullWidth
                                variant="outlined"
                                sx={{
                                    marginTop: '20px',
                                }}
                            >
                                <Button
                                    sx={{ backgroundColor: 'salmon', color: 'black' }}
                                    color="warning"
                                    onClick={() => deleteSelectedQuote()}
                                >
                                    YES
                                </Button>
                                <Button
                                    color="secondary"
                                    onClick={() => setDeleteQuote(false)}
                                >
                                    NO
                                </Button>
                            </ButtonGroup>
                        </Box>
                    }
                </BottomNavigation>
            }
        </Box>
    )
}
