import { createTheme, ThemeOptions } from "@mui/material";

const theme: ThemeOptions = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: "#0f0302",
        },
        text: {
            primary: "#d7d4d9",
        },
    },
    typography: {
        h1: {
            fontFamily: "PirataOne",
            fontSize: "3rem",
        },
        fontFamily: ['"High Tower"', '"Arial"'].join(","),
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
            @font-face {
              font-family: 'PirataOne';
              font-weight: normal;
              font-style: normal;
              font-display: swap;
              src: local('PirataOne'), local('PirataOne-Regular'), url('/fonts/PirataOne-Gloomhaven.ttf') format('woff2');
            }
            @font-face {
                font-family: 'Nyala';
                font-weight: normal;
                font-style: normal;
                font-display: swap;
                src: local('Nyala'), local('Nyala-Regular'), url('/fonts/nyala.ttf') format('woff2');
              }
              @font-face {
                font-family: 'High Tower';
                font-weight: normal;
                font-style: normal;
                font-display: swap;
                src: local('High Tower'), local('High Tower-Regular'), url('/fonts/HTOWERT.TTF') format('woff2');
              }
          `,
        },
    },
});

export default theme;
