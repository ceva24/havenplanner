import { AppBar, Box, Button, Checkbox, FormControlLabel, IconButton, Toolbar, Typography } from "@mui/material";
import ShareButton from "./share/share-button";

interface HeaderProps {
    character: Character;
}

const Header = ({ character }: HeaderProps) => {
    return (
        <Box component="header">
            <AppBar position="static">
                <Toolbar>
                    <Typography color="textPrimary" variant="h1" padding="1rem" sx={{ flexGrow: 1 }}>
                        Gloomhaven Character Planner
                    </Typography>
                    <FormControlLabel control={<Checkbox disabled />} label="Spoilers" />
                    <ShareButton character={character} />
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
