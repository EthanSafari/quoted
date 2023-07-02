import { Box, Button, List, ListItem } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/clientApp";

export default function OptionsMenu( { openMenu, setOpenMenu }) {
    const optionMenuDesign = {

    };
    const logoutDesign = {
        width: '100vw',
        fontSize: '18px'
    };
    return (
        <Box mt={8} sx={optionMenuDesign}>
            <List>
                <Button
                    variant="text"
                    color="warning"
                    sx={logoutDesign}
                    onClick={() => {
                        signOut(auth);
                        setOpenMenu(!openMenu);
                    }}
                >
                    LOG OUT
                </Button>
            </List>
        </Box>
    )
}
