import { AppBar, Box, Link, Toolbar } from "@mui/material";
import ShareButton from "@/components/header/share-button";

interface HeaderProps {
    character?: Character;
}

const Header = ({ character }: HeaderProps) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Box padding={2.5} sx={{ flexGrow: 1 }}>
                    <h1 style={{ margin: 0, lineHeight: 1 }}>
                        <Link href="/" underline="none" color="textPrimary" variant="h1">
                            Gloomhaven Character Planner
                        </Link>
                    </h1>
                </Box>
                <Box>{character && <ShareButton character={character} />}</Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
