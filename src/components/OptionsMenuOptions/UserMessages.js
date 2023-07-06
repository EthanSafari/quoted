import { auth } from "@/src/firebase/clientApp";
import { Update } from "@mui/icons-material";
import { BottomNavigation, Box, Button, ButtonGroup, Chip, Divider, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";

export default function UserMessages() {
    const [user] = useAuthState(auth);
    const allMessages = useSelector(state => state.messages.messages);
    const userMessages = Object.values(allMessages).filter(message => message.author === user.uid);
    const [editOptions, setEditOptions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [selectedQuote, setSelectedQuote] = useState({

    });
    return (
        <Box mt={10} mb={0}>
            <Typography
                variant="h5"
                align="center"
                mb={2}
            >
                YOUR QUOTES
            </Typography>
            <Divider>
                <Chip label='SELECT ON AN QUOTE FOR OPTIONS' />
            </Divider>
            <List>
                {userMessages.map(({ message, createdAt }, i) => (
                    <ListItemButton
                        key={i}
                        fullWidth
                        alignItems='center'
                        divider
                        selected={selectedIndex === i}
                        onClick={() => {
                            setEditOptions(!editOptions)
                            setSelectedIndex(selectedIndex !== i ? i : null)
                        }}
                    >
                        <ListItemText primary={createdAt.seconds || createdAt} secondary={message} />
                    </ListItemButton>
                ))}
            </List>
            {editOptions &&
                <BottomNavigation
                    sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, borderTop: '1px solid rgba(1, 1, 1, .7)', }}
                >
                    <ButtonGroup>
                        <Button>
                            UPDATE
                        </Button>
                        <Button>
                            DELETE
                        </Button>
                    </ButtonGroup>
                </BottomNavigation>
            }
        </Box>
    )
}
