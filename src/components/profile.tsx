import { Grid } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import CharacterDetails from "@/components/profile/character-details";
import CharacterMat from "@/components/profile/character-mat";
import PersonalQuestCard from "@/components/profile/personal-quest-card";

interface ProfileProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const Profile = ({ character, setCharacter }: ProfileProps) => {
    return (
        <Grid container spacing={10}>
            <Grid item lg={4}>
                <CharacterDetails character={character} setCharacter={setCharacter} />
            </Grid>
            <Grid item lg={8} textAlign="center">
                <Grid container spacing={10}>
                    <Grid item lg={8}>
                        <CharacterMat characterClass={character.characterClass} />
                    </Grid>
                    <Grid item lg={4} width="100%">
                        <PersonalQuestCard character={character} setCharacter={setCharacter} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Profile;
