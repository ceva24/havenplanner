import { type Dispatch, type SetStateAction } from "react";
import { AppBar, Box, Chip, Grid, Link, Toolbar, Typography } from "@mui/material";
import ShareButton from "@/client/components/share/share-button";
import SettingsButton from "@/client/components/settings/settings-button";
import SpoilAllSwitch from "@/client/components/settings/spoil-all-switch";

interface HeaderProperties {
    readonly title: string;
    readonly character?: Character;
    readonly setCharacter?: Dispatch<SetStateAction<Character>>;
}

const Header = ({ title, character, setCharacter }: HeaderProperties) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container paddingY={{ xs: 1, md: 0 }}>
                        <Grid item padding={1}>
                            <Typography component="h1" style={{ lineHeight: 1 }}>
                                <Link href="/" underline="none" color="textPrimary" variant="h1">
                                    {title}
                                </Link>
                            </Typography>
                        </Grid>
                        <Grid item padding={1}>
                            <Chip label={<Typography variant="body2">BETA</Typography>} />
                        </Grid>
                    </Grid>
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
