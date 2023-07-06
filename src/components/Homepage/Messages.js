import { firestoreDb } from "@/src/firebase/clientApp";
import { Box, List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import { collection, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import safeJsonStringify from "safe-json-stringify";

export default function Messages() {
    const allMessages = useSelector(state => state.messages.messages);
    const messageList =  Object.values(allMessages);
    return (
        <Box mt={6} mb={8}>
            <List>
                {messageList.map(({ message, createdAt }, i) => (
                    <ListItem button key={i}>
                        <ListItemAvatar>
                            <Avatar alt="Profile Picture" />
                        </ListItemAvatar>
                        <ListItemText primary={createdAt.seconds || createdAt} secondary={message} />
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}

export async function getServerSideProps() {
    try {
        const data = [];
        const snapshot = await getDocs(collection(firestoreDb, "messages"));
        snapshot.forEach((doc) => {
            data.push(JSON.parse(safeJsonStringify(doc.data())));
        });
        return {
            props: {
                messageData: data,
            }
        }
    } catch (error) {
        console.log(error)
    }
}
