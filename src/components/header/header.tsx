import { AppBar, Box, FormControlLabel, Grid, Link, Switch, Toolbar, Typography } from "@mui/material";
import ShareButton from "@/components/header/share-button";

interface HeaderProps {
    character: Character;
}

const Header = ({ character }: HeaderProps) => {
    return (
        <Box component="header">
            <AppBar position="static">
                <Toolbar>
                    <Box padding={2.5} sx={{ flexGrow: 1 }}>
                        <h1 style={{ margin: 0, lineHeight: 1 }}>
                            <Link href="/" underline="none" color="textPrimary" variant="h1">
                                Gloomhaven Character Planner
                            </Link>
                        </h1>
                    </Box>
                    <Box>
                        <Grid container>
                            <Grid item display="flex">
                                <FormControlLabel
                                    control={<Switch disabled id="show-spoilers-switch" name="Show spoilers" />}
                                    label="Show spoilers"
                                />
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
