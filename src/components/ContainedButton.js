import { Button } from "@mui/material"

export default function ContainedButton({ text }) {
    const buttonDesign = {
        maxWidth: '240px',
    }
    return (
        <Button variant="contained" sx={buttonDesign}>
            {text}
        </Button>
    )
};
