import { type Dispatch, type SetStateAction } from "react";
import { AppBar, Box, Grid, Link, Toolbar, Typography } from "@mui/material";
import ShareButton from "@/components/header/share-button";
import SettingsButton from "@/components/header/settings-button";
import SpoilAllSwitch from "@/components/settings/spoil-all-switch";

interface HeaderProps {
    character?: Character;
    setCharacter?: Dispatch<SetStateAction<Character>>;
}

const Header = ({ character, setCharacter }: HeaderProps) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography component="h1" style={{ lineHeight: 1 }}>
                        <Link href="/" underline="none" color="textPrimary" variant="h1">
                            Gloomhaven Character Planner
                        </Link>
                    </Typography>
                </Box>
                {character && setCharacter && (
                    <Box>
                        <Grid container textAlign="right" paddingY={{ xs: 1, md: 0 }}>
                            <Grid item padding={1} display={{ xs: "none", md: "flex" }} alignItems="center">
                                <SpoilAllSwitch
                                    shouldApplyImmediately
                                    character={character}
                                    setCharacter={setCharacter}
                                />
                            </Grid>
                            <Grid item padding={1} sx={{ width: { xs: "100%", md: "auto" } }}>
                                <SettingsButton character={character} setCharacter={setCharacter} />
                            </Grid>
                            <Grid item padding={1} sx={{ width: { xs: "100%", md: "auto" } }}>
                                <ShareButton character={character} />
                            </Grid>
                        </Grid>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
