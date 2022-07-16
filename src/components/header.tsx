import { AppBar, Box, Checkbox, FormControlLabel, Grid, Toolbar, Typography } from "@mui/material";
import ShareButton from "@/components/share/share-button";

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
                    <Box>
                        <Grid container>
                            <Grid item>
                                <FormControlLabel control={<Checkbox disabled />} label="Spoilers" />
                            </Grid>
                            <Grid item>
                                <ShareButton character={character} />
                            </Grid>
                        </Grid>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
