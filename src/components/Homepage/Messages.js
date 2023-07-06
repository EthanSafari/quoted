import { auth } from "@/src/firebase/clientApp";
import { Box, List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
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
        <Box mt={8} mb={8}>
            <List>
                {allQuotes.map(({ message, createdAt, author }, i) => (
                    <ListItem button key={i}>
                        <ListItemAvatar>
                            <Avatar alt="Profile Picture" src={author === user.uid ? user.photoURL : allUsers[author]?.profilePhotoUrl} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={author === user.uid ? user.displayName : allUsers[author]?.username}
                            secondary={`${new Date(createdAt).toDateString()} : ${message}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    )
};
