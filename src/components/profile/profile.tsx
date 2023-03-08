import type { Dispatch, SetStateAction } from "react";
import { Box, Grid } from "@mui/material";
import { useSettingsContext } from "@/hooks/use-settings";
import CharacterDetails from "@/components/profile/character-details";
import PersonalQuestSwitch from "@/components/profile/personal-quest-switch";
import CharacterMat from "@/components/profile/character-mat";
import PersonalQuest from "@/components/profile/personal-quest";

interface ProfileProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const Profile = ({ character, setCharacter }: ProfileProps) => {
    const [settings] = useSettingsContext();

    return (
        <Grid container spacing={{ xs: 5, xl: 10 }}>
            <Grid item xl={5} sx={{ margin: "auto" }}>
                <CharacterDetails character={character} setCharacter={setCharacter} />
            </Grid>
            <Grid item xl={7} textAlign="center" width="100%">
                <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
                    <PersonalQuestSwitch />
                    {settings.showPersonalQuest ? (
                        <PersonalQuest character={character} setCharacter={setCharacter} />
                    ) : (
                        <CharacterMat characterClass={character.characterClass} />
                    )}
                </Box>
            </Grid>
        </Grid>
    );
};

export default Profile;
