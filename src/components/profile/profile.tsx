import { Box, Grid } from "@mui/material";
import type { Dispatch, SetStateAction } from "react";
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
            <Grid item xl={4} sx={{ margin: "auto" }}>
                <CharacterDetails character={character} setCharacter={setCharacter} />
            </Grid>
            <Grid item xl={8} textAlign="center" width="100%">
                <Grid container spacing={10}>
                    <Grid item lg={8} width="100%">
                        <Box>
                            <CharacterMat characterClass={character.characterClass} />
                        </Box>
                    </Grid>
                    <Grid item lg={4} width="100%">
                        <PersonalQuest character={character} setCharacter={setCharacter} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Profile;
