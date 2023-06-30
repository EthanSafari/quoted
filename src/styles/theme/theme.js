const { createTheme } = require("@mui/material");

const theme = createTheme({
    palette: {
        primary: {
            main: '#f5f5f5'
        },
        secondary: {
            main: '#000000',
        },
        typography: {
            "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
        }
    }
});

export default theme;
