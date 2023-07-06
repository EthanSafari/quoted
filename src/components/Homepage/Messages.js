import { auth } from "@/src/firebase/clientApp";
import { Box, List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";

export default function Messages() {
    const [user] = useAuthState(auth);
    const allMessages = useSelector(state => state.messages.messages);
    const allUsers = useSelector(state => state.users.users);
    const messageList = Object.values(allMessages).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return (
        <Box mt={8} mb={8}>
            <List>
                {messageList.map(({ message, createdAt, author }, i) => (
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
