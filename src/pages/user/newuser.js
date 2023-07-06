import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, firestoreDb } from "../../firebase/clientApp";
import { useAuthState, useUpdateProfile } from "react-firebase-hooks/auth";
import { Avatar, Box, Button, Container, TextField, Typography } from "@mui/material";
import LandingPageText from "@/src/components/LoggedOut/LandingPageText";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import QuotedLarge from "@/src/components/LoggedOut/QuotedLarge";
import { redirect } from "next/dist/server/api-utils";

export default function FirestoreUser() {
    const router = useRouter();
    const [user, loading, error] = useAuthState(auth);
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const [err, setErr] = useState("");
    useEffect(() => {
        if (!user)
            router.push('/auth/signup');
    },[]);
    const [newUser, setNewUser] = useState({
        id: user?.uid,
        username: "",
        email: user?.email,
        profilePhotoUrl: user?.photoURL || "",
        createdAt: user?.metadata.creationTime,
    });
    const onChange = (e) => {
        setNewUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const handleCreateUser = async (e) => {
        e.preventDefault();
        setErr('');
        try {
            const userDocRef = doc(firestoreDb, 'users', newUser.id);
            const userDoc = getDoc(userDocRef);
            if ((await userDoc).exists())
                throw new Error(`${newUser.username} ALREADY EXISTS. PLEASE ENTER A NEW ONE.`);
            await setDoc(userDocRef, newUser);
            await updateProfile({ displayName: newUser.username, photoURL: newUser.profilePhotoUrl });
        } catch (error) {
            setErr(error.message);
            return;
        }
        router.push('/');
    };
    const boxDesign = {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    };
    const avatarDesign = {
        width: 100,
        height: 100,
        margin: '15px 0'
    };
    const formBoxDesign = {
        display: 'flex',
        justifyContent: 'center',
    };
    const formDesign = {
        width: '70vw',
    };
    const submitDesign = {
        marginTop: '20px',
    };
    const introText = 'LETS GET TO KNOW YOU BETTER...';
    return (
        <Box sx={boxDesign}>
            <Container>
                <QuotedLarge />
                <LandingPageText text={introText} />
            </Container>
            <Avatar
                src={newUser.profilePhotoUrl}
                sx={avatarDesign}
                alt={newUser.username}
            />
            <Container>
                <Box
                    sx={formBoxDesign}
                    mt={2}
                >
                    <form
                        onSubmit={handleCreateUser}
                        style={formDesign}
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
                            margin="normal"
                        />
                        {/* <TextField
                            label="DESCRIPTION"
                            value={newUser.description}
                            fullWidth
                            name="description"
                            type="text"
                            onChange={onChange}
                            multiline
                        /> */}
                        {err.length > 0 && (
                            <Typography>
                                {err}
                            </Typography>
                        )}
                        {!updating ? (
                            <Button
                                variant="contained"
                                fullWidth
                                sx={submitDesign}
                                type="submit"
                            >
                                NICE TO MEET YOU!
                            </Button>
                        ) : (
                            <LoadingButton
                                fullWidth
                                sx={submitDesign}
                            >
                                NICE TO MEET YOU!
                            </LoadingButton>
                        )}
                    </form>
                </Box>
            </Container>
        </Box>
    )
}
