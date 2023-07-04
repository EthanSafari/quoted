import { Button } from "@mui/material"
import Link from "next/link"

export default function ContainedButton({ text, link }) {
    const buttonDesign = {
        width: '70vw',
        maxWidth: '300px',
    };
    const linkStyle ={
        textDecoration: 'none',
        color: 'black',
        width: '100%'
    };
    return (
        <Button variant="contained" sx={buttonDesign}>
            <Link href={link} style={linkStyle}>
                {text}
            </Link>
        </Button>
    )
};
