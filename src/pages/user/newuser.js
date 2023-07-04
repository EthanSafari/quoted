import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, firestoreDb } from "../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { Avatar, Box, Button, Container, TextField, Typography } from "@mui/material";
import LandingPageText from "@/src/components/LandingPageText";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";

export default function FirestoreUser() {
    const router = useRouter();
    const [user, loading, error] = useAuthState(auth);
    const [err, setErr] = useState("");
    const [newUserLoading, setNewUserLoading] = useState(false);
    const [newUser, setNewUser] = useState({
        id: user?.uid,
        username: "",
        profilePhotoUrl: user?.photoURL || "",
        description: "",
        createdAt: serverTimestamp(),
    });
    const onChange = (e) => {
        setNewUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const handleCreateUser = async (e) => {
        e.preventDefault();
        const userDocRef = doc(firestoreDb, 'users', newUser.id);
        const userDoc = getDoc(userDocRef);
        setNewUserLoading(true);
        if ((await userDoc).exists())
            throw new Error(`${newUser.username} ALREADY EXISTS. PLEASE ENTER A NEW ONE.`);
        try {
            await setDoc(userDocRef, newUser);
        } catch (e) {
            setErr(e.message);
        }
        setNewUserLoading(false);
        router.push('/');
    };
    const boxDesign = {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    };
    const avatarDesign = {
        width: 100,
        height: 100,
    };
    const introText = 'LETS GET TO KNOW YOU BETTER...';
    return (
        <Box sx={boxDesign}>
            <LandingPageText text={introText} />
            <Avatar
                src={newUser.profilePhotoUrl}
                sx={avatarDesign}
                alt={newUser.username}
            />
            {err.length > 0 && (
                <Typography>
                    {err}
                </Typography>
            )}
            <Box>
                <form
                    onSubmit={handleCreateUser}
                >
                    <TextField
                        required
                        label="USERNAME"
                        value={newUser.username}
                        fullWidth
                        name="username"
                        type="text"
                        onChange={onChange}
                    />
                    <TextField
                        label="PROFILE PICTURE URL"
                        value={newUser.profilePhotoUrl}
                        fullWidth
                        name="profilePhotoUrl"
                        type="url"
                        onChange={onChange}
                    />
                    <TextField
                        label="DESCRIPTION"
                        value={newUser.description}
                        fullWidth
                        name="description"
                        type="text"
                        onChange={onChange}
                        multiline
                    />
                        {!newUserLoading ? (
                            <Button
                                variant="contained"
                                fullWidth
                                // sx={submitDesign}
                                type="submit"
                            >
                                SIGN UP
                            </Button>
                        ) : (
                            <LoadingButton
                                fullWidth
                                // sx={submitDesign}
                            >
                                SIGN UP
                            </LoadingButton>
                        )}
                </form>
            </Box>
        </Box>
    )
}
