import { Avatar, Box, Chip, Divider } from "@mui/material";
import { auth } from "../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

export default function OptionUserInfo() {
    const [user, loading, error] = useAuthState(auth);
    const boxDesign = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };
    const avatarDesign = {
        width: 100,
        height: 100,
        marginBottom: '25px',
    };
    const nameDesign = {
        fontSize: '20px'
    };
    console.log(user)
    return (
        <Box
            sx={boxDesign}
        >
            <Avatar
                sx={avatarDesign}
                src={user?.photoURL}
            />
            <Divider sx={{
                width: '80vw',
            }}
            >
                <Chip sx={nameDesign} label={user?.displayName || user.email?.split("@")[0]} />
            </Divider>
        </Box>
    )
}
