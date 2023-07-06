import { Avatar, Box, TextField, Button, Typography, Divider } from "@mui/material";
import { useAuthState, useSendPasswordResetEmail, useUpdateEmail, useUpdateProfile } from "react-firebase-hooks/auth";
import { auth, firestoreDb } from "../../firebase/clientApp";
import { useContext, useState } from "react";
import { PageContext } from "../../context/PageContext";
import { doc, setDoc, updateDoc } from "firebase/firestore";

export default function EditProfile() {
    const { setPageNumber } = useContext(PageContext);
    const [user, loading, error] = useAuthState(auth);
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const [updateEmail, emailUpdating, emailError] = useUpdateEmail(auth);
    const [sendPasswordResetEmail, sending, emailPassError] = useSendPasswordResetEmail(auth);
    const [err, setErr] = useState('');
    const [updateUser, setUpdateUser] = useState({
        id: user.uid,
        email: user.email,
        username: user.displayName,
        profilePhotoUrl: user.photoURL || "",
        createdAt: user.metadata.creationTime,
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
            // if (updateUser.password.length > 6) await updatePassword(updateUser.password);
            await updateProfile({ displayName: updateUser.username, photoURL: updateUser.profilePhotoUrl });
            const userDocRef = doc(firestoreDb, 'users', updateUser.id);
            await updateDoc(userDocRef, updateUser);
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
    const updateButtonDesign = {
        marginTop: '20px',
        marginBottom: '10px',
    };
    const actionCodeSettings = {
        url: 'http://localhost:3000/',
    };
    return (
        <Box sx={boxDesign}>
            <Typography variant="h5">
                UPDATE INFORMATION
            </Typography>
            <Avatar
                src={updateUser.profilePhotoUrl}
                sx={avatarDesign}
                alt={updateUser.username}
            />
            {err.length > 1 && (
                <Typography>
                    {err}
                </Typography>
            )}
            <form
                style={formStyle}
                onSubmit={updateUserProfile}
            >
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
                <Button
                    variant="outlined"
                    fullWidth
                    color="secondary"
                    sx={updateButtonDesign}
                    size="large"
                    onClick={async () => {
                        try {
                            await sendPasswordResetEmail(user.email, actionCodeSettings)
                        } catch (error) {
                            setErr(error.message);
                            return;
                        };
                    }}
                >
                    RESET PASSWORD
                </Button>
                <Divider
                    sx={{ fontSize: '10px'}}>
                    EMAIL WILL BE SENT TO RESET PASSWORD
                </Divider>
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
