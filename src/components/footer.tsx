import { Box, Typography } from "@mui/material";

const Footer = () => {
    return (
        <Box component="header">
            <Typography
                color="textPrimary"
                component="h1"
                fontFamily="High Tower"
                align="right"
                padding="2rem"
            >
                <em>
                    Gloomhaven and all related properties, images and text are
                    owned by Cephalofair Games.
                </em>
            </Typography>
        </Box>
    );
};

export default Footer;
