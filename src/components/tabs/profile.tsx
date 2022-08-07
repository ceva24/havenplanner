import { Box, Grid } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import CharacterDetails from "@/components/profile/character-details";
import CharacterMat from "@/components/profile/character-mat";
import PersonalQuest from "@/components/profile/personal-quest";

interface ProfileProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const Profile = ({ character, setCharacter }: ProfileProps) => {
    return (
        <Grid container spacing={10}>
            <Grid item lg={4} sx={{ margin: "auto" }}>
                <CharacterDetails character={character} setCharacter={setCharacter} />
            </Grid>
            <Grid item lg={8} textAlign="center" width="100%">
                <Grid container spacing={10}>
                    <Grid item md={8} width="100%" sx={{ display: { xs: "none", sm: "inherit" } }}>
                        <Box>
                            <CharacterMat characterClass={character.characterClass} />
                        </Box>
                    </Grid>
                    <Grid item md={4} width="100%">
                        <PersonalQuest character={character} setCharacter={setCharacter} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Profile;
