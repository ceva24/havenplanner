import { Box, Typography } from "@mui/material";

const Footer = () => {
    return (
        <Box component="footer">
            <Typography
                color="textPrimary"
                component="h1"
                align="right"
                padding="2rem"
            >
                Gloomhaven and all related properties, images and text are owned
                by Cephalofair Games
            </Typography>
        </Box>
    );
};

export default Footer;
