import { type Dispatch, type SetStateAction } from "react";
import { AppBar, Box, Grid, Link, Toolbar } from "@mui/material";
import ShareButton from "@/components/header/share-button";
import SettingsButton from "@/components/header/settings-button";

interface HeaderProps {
    character?: Character;
    setCharacter?: Dispatch<SetStateAction<Character>>;
}

const Header = ({ character, setCharacter }: HeaderProps) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Box padding={2} sx={{ flexGrow: 1 }}>
                    <h1 style={{ margin: 0, lineHeight: 1 }}>
                        <Link href="/" underline="none" color="textPrimary" variant="h1">
                            Gloomhaven Character Planner
                        </Link>
                    </h1>
                </Box>
                {character && setCharacter && (
                    <Box>
                        <Grid container textAlign="right" paddingY={{ xs: 1, md: 0 }}>
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
