import type { Dispatch, SetStateAction } from "react";
import { Box, FormControl, FormControlLabel, Switch } from "@mui/material";
import { useAppSettingsContext } from "@/hooks/app-settings";
import { Card } from "@/components/core/cards";
import PersonalQuestAutocomplete from "@/components/profile/personal-quest-autocomplete";

const defaultPersonalQuestCardImageUrl = "/personal-quests/gloomhaven/gh-pq-back.webp";

interface PersonalQuestProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const PersonalQuest = ({ character, setCharacter }: PersonalQuestProps) => {
    const { appSettings, setAppSettings } = useAppSettingsContext();

    const handleChange = () => {
        setAppSettings({ ...appSettings, hidePersonalQuest: !appSettings.hidePersonalQuest });
    };

    const personalQuestImageUrl =
        character.personalQuest && !appSettings.hidePersonalQuest
            ? character.personalQuest?.imageUrl
            : defaultPersonalQuestCardImageUrl;

    const personalQuestAltText =
        character.personalQuest && !appSettings.hidePersonalQuest
            ? `Personal quest ${character.personalQuest.name}`
            : "Personal quest";

    return (
        <FormControl>
            <Box textAlign="center">
                <FormControlLabel
                    control={
                        <Switch
                            id="hide-personal-quest-switch"
                            name="Hide personal quest"
                            checked={appSettings.hidePersonalQuest}
                            disabled={!character.personalQuest}
                            onClick={handleChange}
                        />
                    }
                    label="Hide personal quest"
                />
            </Box>
            <Box sx={{ marginTop: 1, marginBottom: 1 }}>
                <Card src={personalQuestImageUrl} altText={personalQuestAltText} />
            </Box>
            {!appSettings.hidePersonalQuest && (
                <PersonalQuestAutocomplete character={character} setCharacter={setCharacter} />
            )}
        </FormControl>
    );
};

export default PersonalQuest;
