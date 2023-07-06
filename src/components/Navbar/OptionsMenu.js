import { Box, Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/clientApp";
import LogoutIcon from '@mui/icons-material/Logout';
import OptionUserInfo from "./OptionUserInfo";
import { PageContext } from "../../context/PageContext";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { clearMessages } from "@/src/store/message";

export default function OptionsMenu() {
    const dispatch = useDispatch();
    const { pageNumber, setPageNumber } = useContext(PageContext);
    const optionMenuDesign = {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
    };
    const logoutDesign = {
        width: '100vw',
        fontSize: '18px',
        borderTop: '1px solid red',
        borderBottom: '1px solid red',
        backgroundColor: 'rgba(255,0,0,.1)',
        position: 'fixed',
        bottom: 5,
    };
    const buttonBoxDesign = {
        margin: '5vh 0',
    };
    const optionButtonDesign = {
        fontSize: '20px',
        padding: '10px 0',
    };
    return (
        <Box pt={12} sx={optionMenuDesign}>
            <OptionUserInfo />
                <Box
                    sx={buttonBoxDesign}
                >
                    <Button
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        onClick={() => setPageNumber(4)}
                        size="large"
                        sx={optionButtonDesign}
                    >
                        Your Quotes
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        onClick={() => setPageNumber(3)}
                        size="large"
                        sx={optionButtonDesign}
                    >
                        EDIT USER PROFILE
                    </Button>
                </Box>
                <Button
                    variant="text"
                    color="warning"
                    sx={logoutDesign}
                    onClick={() => {
                        signOut(auth);
                        setPageNumber(pageNumber === 1 ? 2 : 1);
                        dispatch(clearMessages());
                    }}
                >
                    LOG OUT
                    <LogoutIcon sx={{ marginLeft: '5px' }} />
                </Button>
        </Box>
    )
}
