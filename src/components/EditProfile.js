import { Avatar, Box, TextField, Button, Typography } from "@mui/material";
import { useAuthState, useUpdateEmail, useUpdatePassword, useUpdateProfile } from "react-firebase-hooks/auth";
import { auth } from "../firebase/clientApp";
import { useContext, useState } from "react";
import { PageContext } from "../context/PageContext";

export default function EditProfile() {
    const { setPageNumber } = useContext(PageContext);
    const [user, loading, error] = useAuthState(auth);
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const [updateEmail, emailUpdating, emailError] = useUpdateEmail(auth);
    const [updatePassword, passwordUpdating, passwordError] = useUpdatePassword(auth);
    const [err, setErr] = useState('');
    const [updateUser, setUpdateUser] = useState({
        email: user.email,
        password: user.password,
        username: user.displayName,
        profilePhotoUrl: user.photoURL || "",
        // description: "",
    });
    const onChange = (e) => {
        setUpdateUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const updateUserProfile = async (e) => {
        e.preventDefault();
        try {
            if (updateUser.email !== user.email) await updateEmail(updateUser.email);
            if (updateUser.password.length > 6) await updatePassword(updateUser.password);
            await updateProfile({displayName: updateUser.username, photoURL: updateUser.profilePhotoUrl});
        } catch (error) {
            setErr(error.message);
            return;
        };
        setPageNumber(2);
    };
    const boxDesign = {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    };
    const avatarDesign = {
        width: 125,
        height: 125,
        margin: '20px 0'
    };
    const formStyle = {
        width: '70vw',
    };
    const buttonDesign = {
        marginTop: '20px',
    };
    return (
        <Box sx={boxDesign}>
            <Typography variant="h5">
                UPDATE PROFILE
            </Typography>
            <Avatar
                src={updateUser.profilePhotoUrl}
                sx={avatarDesign}
                alt={updateUser.username}
            />
            <form
                style={formStyle}
                onSubmit={updateUserProfile}
            >
                <TextField
                    required
                    label="EMAIL"
                    defaultValue={updateUser.email}
                    fullWidth
                    onChange={onChange}
                    name="email"
                    type="email"
                    margin="normal"
                />
                <TextField
                    label="PASSWORD"
                    defaultValue={updateUser.password}
                    fullWidth
                    margin="normal"
                    name="password"
                    type="password"
                    onChange={onChange}
                />
                <TextField
                    label="USERNAME"
                    value={updateUser.username}
                    fullWidth
                    name="username"
                    type="text"
                    onChange={onChange}
                    margin="normal"
                />
                <TextField
                    label="PROFILE PICTURE URL"
                    value={updateUser.profilePhotoUrl}
                    fullWidth
                    name="profilePhotoUrl"
                    type="url"
                    onChange={onChange}
                    margin="normal"
                />
                <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    sx={buttonDesign}
                    size="large"
                >
                    UPDATE PROFILE
                </Button>
            </form>
        </Box>
    )
}
