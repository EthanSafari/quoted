import { Box, Button, List, ListItem } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/clientApp";
import LogoutIcon from '@mui/icons-material/Logout';
import OptionUserInfo from "./OptionUserInfo";

export default function OptionsMenu( { openMenu, setOpenMenu }) {
    const optionMenuDesign = {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    };
    const logoutDesign = {
        width: '100vw',
        fontSize: '18px',
        borderTop: '1px solid red',
        borderBottom: '1px solid red',
        backgroundColor: 'rgba(255,0,0,.1)',
    };
    return (
        <Box pt={12} sx={optionMenuDesign}>
            <OptionUserInfo />
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
