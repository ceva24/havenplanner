import type { ThemeOptions } from "@mui/material";
import { createTheme } from "@mui/material";

const theme: ThemeOptions = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: "#0f0302",
        },
        text: {
            primary: "#d7d4d9",
            secondary: "#b3b1ae",
        },
        primary: {
            main: "#c09172",
        },
        secondary: {
            main: "#d7d4d9",
        },
    },
    typography: {
        h1: {
            fontFamily: "PirataOne",
            fontSize: "1.85rem",
        },
        h2: {
            fontFamily: "PirataOne",
            fontSize: "1.85rem",
        },
        body1: {
            fontFamily: "Sakkal Majalla",
            fontSize: "1.25rem",
        },
        body2: {
            fontFamily: "High Tower",
        },
    },
    components: {
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    opacity: 0.7,
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: "#0f0302",
                },
            },
        },
        MuiCssBaseline: {
            styleOverrides: `
              @font-face {
                font-family: 'PirataOne';
                font-weight: normal;
                font-style: normal;
                font-display: swap;
                src: local('PirataOne'), local('PirataOne-Regular'), url('/fonts/PirataOne-Gloomhaven.woff2') format('woff2');
              }
              @font-face {
                font-family: 'High Tower';
                font-weight: normal;
                font-style: normal;
                font-display: swap;
                src: local('High Tower'), local('High Tower-Regular'), url('/fonts/HTOWERT.woff2') format('woff2');
              }
              @font-face {
                font-family: 'Sakkal Majalla';
                font-weight: normal;
                font-style: normal;
                font-display: swap;
                src: local('Sakkal Majalla'), local('Sakkal Majalla-Regular'), url('/fonts/majalla.woff2') format('woff2');
              }
          `,
        },
    },
});

export default theme;
