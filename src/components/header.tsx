import { Box, Typography } from "@mui/material";

const Header = () => {
    return (
        <Box component="header">
            <Typography
                color="textPrimary"
                variant="h1"
                align="center"
                padding="2rem 0"
            >
                Gloomhaven Character Planner
            </Typography>
        </Box>
    );
};

export default Header;
