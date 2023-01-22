import { Box, FormControl, FormControlLabel, Switch } from "@mui/material";
import type { Dispatch, SetStateAction } from "react";
import { Card } from "@/components/core/cards";
import PersonalQuestAutocomplete from "@/components/profile/personal-quest-autocomplete";
import { useAppSettingsContext } from "@/hooks/app-settings";

const defaultPersonalQuestCardImageUrl = "/personal-quests/gloomhaven/gh-pq-back.webp";

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

    const personalQuestAltText =
        appSettings.showPersonalQuest && character.personalQuest
            ? `Personal quest ${character.personalQuest.name}`
            : "Personal quest";

    return (
        <FormControl>
            {appSettings.showPersonalQuestButton && (
                <Box textAlign="center">
                    <FormControlLabel
                        control={
                            <Switch
                                id="show-personal-quest-switch"
                                name="Show personal quest"
                                checked={appSettings.showPersonalQuest}
                                onClick={handleChange}
                            />
                        }
                        label="Show personal quest"
                    />
                </Box>
            )}
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
