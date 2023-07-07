import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { auth, firestoreDb, storage } from "../../firebase/clientApp";
import { useAuthState, useUpdateProfile } from "react-firebase-hooks/auth";
import { Avatar, Box, Button, Container, IconButton, TextField, Typography } from "@mui/material";
import LandingPageText from "@/src/components/LoggedOut/LandingPageText";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import QuotedLarge from "@/src/components/LoggedOut/QuotedLarge";
import { redirect } from "next/dist/server/api-utils";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

export default function FirestoreUser() {
    const router = useRouter();
    const [user, loading, error] = useAuthState(auth);
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const [err, setErr] = useState("");

    const [selectedFile, setSelectedFile] = useState("");
    const selectedFileRef = useRef(null);

    console.log(selectedFile)
    useEffect(() => {
        if (!user)
            router.push('/auth/signup');
    }, []);
    const [newUser, setNewUser] = useState({
        id: user?.uid,
        username: "",
        email: user?.email,
        profilePhotoUrl: selectedFile,
        createdAt: user?.metadata.creationTime,
    });
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
            if (selectedFile.length > 0) {
                const imageRef = ref(storage, `users/${user?.uid}/image`);
                await uploadString(imageRef, selectedFile, 'data_url');
                const downloadURL = await getDownloadURL(imageRef);
                await updateDoc(userDocRef, {
                    profilePhotoUrl: downloadURL,
                });
                await updateProfile({ displayName: newUser.username, photoURL: downloadURL });
            };
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
    console.log(newUser)
    return (
        <Box sx={boxDesign}>
            <Container>
                <QuotedLarge />
                <LandingPageText text={introText} />
            </Container>
            <Typography
                        mt={3}
                    >
                        UPLOAD IMAGE
                    </Typography>
            <IconButton
                sx={{
                    borderRadius: '100px',
                    width: 125,
                    height: 125,
                }}
            >
            <Avatar
                src={selectedFile}
                sx={avatarDesign}
                alt={newUser.username}
                onClick={() => selectedFileRef.current.click()}
            />
                        </IconButton>
            <input
                type="file"
                hidden
                ref={selectedFileRef}
                onChange={onSelectImage}
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
