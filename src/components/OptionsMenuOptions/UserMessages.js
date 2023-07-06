import { auth } from "@/src/firebase/clientApp";
import { BottomNavigation, Box, Button, ButtonGroup, Chip, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import EditNoteIcon from '@mui/icons-material/EditNote';

export default function UserMessages() {
    const [user] = useAuthState(auth);
    const allMessages = useSelector(state => state.messages.messages);
    const userMessages = Object.values(allMessages).filter(message => message.author === user.uid);
    const [editOptions, setEditOptions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [updateQuote, setUpdateQuote] = useState(false);
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
    console.log(selectedQuote)
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
                <Chip label='SELECT ON AN QUOTE FOR OPTIONS' />
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
                        <ListItemText primary={message.createdAt.seconds || message.createdAt} secondary={message.message} />
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
                        {selectedQuote.message}
                    </Typography>
                    <ButtonGroup
                        size="large"
                        variant="text"
                        color="secondary"
                        fullWidth
                    >
                        <Button
                            onClick={() => setUpdateQuote(!updateQuote)}
                        >
                            UPDATE
                        </Button>
                        {!updateQuote && <Button
                            color="warning"
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
                                <Typography>
                                    {err}
                                </Typography>
                            )}
                            <form

                            >
                                <TextField
                                    label="Want to Update?"
                                    multiline
                                    sx={textboxDesign}
                                    value={selectedQuote.message}
                                    name='message'
                                    onChange={onChange}
                                />
                                <IconButton
                                    color='secondary'
                                // type='submit'
                                >
                                    <EditNoteIcon
                                        fontSize='large'
                                    />
                                </IconButton>
                            </form>
                        </Box>
                    }
                </BottomNavigation>
            }
        </Box>
    )
}
