import { Avatar, Box, TextField } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/clientApp";

export default function EditProfile() {
    const [user, loading, error] = useAuthState(auth);
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
    const boxDesign = {
        height: '100vh',
        width: '100vw',
    };
    return (
        <Box sx={boxDesign}>
            <Avatar
                src={updateUser.profilePhotoUrl}
                // sx={avatarDesign}
                alt={updateUser.username}
            />
            <form>
                <TextField
                    required
                    label="EMAIL"
                    defaultValue={updateUser.email}
                    fullWidth
                    onChange={onChange}
                    name="email"
                    type="email"
                />
                <TextField
                    required
                    label="PASSWORD"
                    defaultValue={updateUser.password}
                    fullWidth
                    margin="normal"
                    name="password"
                    type="password"
                    onChange={onChange}
                />
                <TextField
                    required
                    label="USERNAME"
                    value={updateUser.username}
                    fullWidth
                    name="username"
                    type="text"
                    onChange={onChange}
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
                <Button>
                    UPDATE PROFILE
                </Button>
            </form>
        </Box>
    )
}
