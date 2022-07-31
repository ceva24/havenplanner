import { FormControlLabel, Switch, Box, FormControl } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { Card } from "@/components/cards";
import PersonalQuestAutocomplete from "@/components/profile/personal-quest-autocomplete";
import { defaultPersonalQuestCardImageUrl } from "@/utils/images";
import { useAppSettingsContext } from "@/hooks/app-settings";

interface PersonalQuestProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const PersonalQuest = ({ character, setCharacter }: PersonalQuestProps) => {
    const { appSettings, setAppSettings } = useAppSettingsContext();

    const handleChange = () => {
        setAppSettings({ ...appSettings, showPersonalQuest: !appSettings.showPersonalQuest });
    };

    const personalQuestImageUrl =
        appSettings.showPersonalQuest && character.personalQuest
            ? character.personalQuest?.imageUrl
            : defaultPersonalQuestCardImageUrl;

    const personalQuestAltText = character.personalQuest?.name
        ? `Personal quest ${character.personalQuest.name}`
        : "Personal quest";

    return (
        <FormControl>
            <Box textAlign="center">
                <FormControlLabel
                    control={
                        <Switch
                            name="Show personal quest"
                            checked={appSettings.showPersonalQuest}
                            onClick={handleChange}
                        />
                    }
                    label="Show personal quest"
                />
            </Box>
            <Box sx={{ marginTop: 1, marginBottom: 1 }}>
                <Card src={personalQuestImageUrl} altText={personalQuestAltText} />
            </Box>
            {appSettings?.showPersonalQuest && (
                <PersonalQuestAutocomplete character={character} setCharacter={setCharacter} />
            )}
        </FormControl>
    );
};

export default PersonalQuest;
