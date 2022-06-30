import { Grid } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import CharacterDetails from "./profile/character-details";
import CharacterMat from "./profile/character-mat";

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
                <CharacterMat characterClass={character.characterClass} />
            </Grid>
        </Grid>
    );
};

export default Profile;
