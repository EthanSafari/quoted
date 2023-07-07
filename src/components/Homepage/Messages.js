import { auth } from "@/src/firebase/clientApp";
import { Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";

export default function Messages() {
    const [user] = useAuthState(auth);
    const allQuotes = useSelector(state => {
        const stateQuotes = state.messages.messages;
        const quotesArr = Object.values(stateQuotes);
        const sortedQuotes = quotesArr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return sortedQuotes;
    });
    const allUsers = useSelector(state => state.users.users);
    // const [messageList, setMessageList] = useState([]);
    // const messageList = Object.values(allMessages).sort((a, b) => new Date(b.createdAt) + new Date(a.createdAt));
    return (
        <Box mt={8} mb={8} pr={2} pl={2}>
            <List>
                {allQuotes.map(({ message, createdAt, author }, i) => (
                    <>
                        <ListItem button key={i}>
                            <ListItemAvatar>
                                <Avatar
                                alt="Profile Picture"
                                src={author === user.uid ? user.photoURL : allUsers[author]?.profilePhotoUrl}
                                sx={{
                                    width: 60,
                                    height: 60,
                                    marginRight: '15px',
                                }}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={`"${message}"`}
                                secondary={
                                    <>
                                        - {author === user.uid ? user.displayName : allUsers[author]?.username} -
                                        <Typography
                                            sx={{
                                                fontSize: '10px',
                                                marginLeft: '15px'
                                            }}
                                        >
                                            {new Date(createdAt).toDateString()}
                                        </Typography>
                                    </>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" />
                    </>
                ))}
            </List>
        </Box>
    )
};
