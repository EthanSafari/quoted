import { Avatar, Box, TextField, Button, Typography, Divider, Tooltip, IconButton } from "@mui/material";
import { useAuthState, useSendPasswordResetEmail, useUpdateEmail, useUpdateProfile } from "react-firebase-hooks/auth";
import { auth, firestoreDb, storage } from "../../firebase/clientApp";
import { useContext, useRef, useState } from "react";
import { PageContext } from "../../context/PageContext";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

export default function EditProfile() {
    const { setPageNumber } = useContext(PageContext);
    const [user, loading, error] = useAuthState(auth);
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const [updateEmail, emailUpdating, emailError] = useUpdateEmail(auth);
    const [sendPasswordResetEmail, sending, emailPassError] = useSendPasswordResetEmail(auth);
    const [err, setErr] = useState('');
    const [selectedFile, setSelectedFile] = useState(user.photoURL);
    const selectedFileRef = useRef(null);
    const [updateUser, setUpdateUser] = useState({
        email: user.email,
        username: user.displayName,
        profilePhotoUrl: selectedFile,
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
            if (updateUser.email !== user.email)
                await updateEmail(updateUser.email);
            if (updateUser.username !== user.displayName || updateUser.profilePhotoUrl !== user.photoURL)
                await updateProfile({ displayName: updateUser.username, photoURL: updateUser.profilePhotoUrl });
            const userDocRef = doc(firestoreDb, 'users', user.uid);
            await updateDoc(userDocRef, updateUser);
            if (selectedFile !== user.photoURL && selectedFile.length > 0) {
                const imageRef = ref(storage, `users/${user.uid}/image`);
                await uploadString(imageRef, selectedFile, 'data_url');
                const downloadURL = await getDownloadURL(imageRef);
                await updateDoc(userDocRef, {
                    profilePhotoUrl: downloadURL,
                });
                await updateProfile({ displayName: updateUser.username, photoURL: downloadURL });
            };
        } catch (error) {
            setErr(error.message);
            return;
        };
        setPageNumber(2);
    };
    const onSelectImage = (e) => {
        const reader = new FileReader();
        if (e.target.files?.[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            if (readerEvent.target?.result) {
                setSelectedFile(readerEvent.target.result)
            }
        }
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
    return (
        <Box sx={boxDesign}>
            <Typography variant="h5">
                UPDATE INFORMATION
            </Typography>
                    <Typography
                        mt={3}
                    >
                        UPLOAD IMAGE
                    </Typography>
            <IconButton
                sx={{
                    borderRadius: '100px', width: 150,
                    height: 150,
                }}
            >
                <Avatar
                    src={selectedFile}
                    sx={avatarDesign}
                    alt={updateUser.username}
                    onClick={() => selectedFileRef.current.click()}
                    button
                />
            </IconButton>
            {/* <Button
                variant="outlined"
                color="secondary"
                onClick={() => setSelectedFile('')}
                mb={2}
            >
                REMOVE PHOTO
            </Button> */}
            <input
                type="file"
                hidden
                ref={selectedFileRef}
                onChange={onSelectImage}
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
                            await sendPasswordResetEmail(user.email)
                        } catch (error) {
                            setErr(error.message);
                            return;
                        };
                    }}
                >
                    RESET PASSWORD
                </Button>
                <Divider
                    sx={{ fontSize: '10px' }}>
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
