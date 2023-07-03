import { Box, Button, List, ListItem } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/clientApp";
import LogoutIcon from '@mui/icons-material/Logout';

export default function OptionsMenu( { openMenu, setOpenMenu }) {
    const optionMenuDesign = {

    };
    const logoutDesign = {
        width: '100vw',
        fontSize: '18px',
        borderTop: '1px solid red',
        borderBottom: '1px solid red',
        backgroundColor: 'rgba(255,0,0,.1)'
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
                    <LogoutIcon sx={{marginLeft: '5px'}}/>
                </Button>
            </List>
        </Box>
    )
}
