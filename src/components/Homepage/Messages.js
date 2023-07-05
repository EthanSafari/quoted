import { firestoreDb } from "@/src/firebase/clientApp";
import { Box, List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import { collection, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import safeJsonStringify from "safe-json-stringify";

const messageExamples = [
    {
        primary: 'Brunch this week?',
        secondary: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
        person: '',
    },
    {
        primary: 'Birthday Gift',
        secondary: `Do you have a suggestion for a good present for John on his work
        anniversary. I am really confused & would love your thoughts on it.`,
        person: '',
    },
    {
        primary: 'Recipe to try',
        secondary: 'I am try out this new BBQ recipe, I think this might be amazing',
        person: '',
    },
    {
        primary: 'Yes!',
        secondary: 'I have the tickets to the ReactConf for this year.',
        person: '',
    },
    {
        primary: "Doctor's Appointment",
        secondary: 'My appointment for the doctor was rescheduled for next Saturday.',
        person: '',
    },
    {
        primary: 'Discussion',
        secondary: `Menus that are generated by the bottom app bar (such as a bottom
        navigation drawer or overflow menu) open as bottom sheets at a higher elevation
        than the bar.`,
        person: '',
    },
    {
        primary: 'Summer BBQ',
        secondary: `Who wants to have a cookout this weekend? I just got some furniture
        for my backyard and would love to fire up the grill.`,
        person: '',
    },
];

function refreshMessages() {
    const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

    return Array.from(new Array(50)).map(
        () => messageExamples[getRandomInt(messageExamples.length)],
    );
}



export default function Messages({ messageData }) {
    const [messageList, setMessageList] = useState([]);
    // console.log(messageList)
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const data = [];
    //             const snapshot = await getDocs(collection(firestoreDb, "messages"));
    //             snapshot.forEach((doc) => {
    //                 data.push(JSON.parse(safeJsonStringify(doc.data())));
    //             });
    //             setMessageList(data);
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     if (!messageData) fetchData();
    // }, []);
    return (
        <Box mt={6} mb={8}>
            <List>
                {messageData?.map(({ message, createdAt }, i) => (
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
        console.log(data)
        return {
            props: {
                messageData: data,
            }
        }
    } catch (error) {
        console.log(error)
    }
}

// getServerSideProps()
