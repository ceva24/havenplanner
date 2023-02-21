import type { Dispatch, SetStateAction } from "react";
import { Box, FormControl, FormControlLabel, Switch } from "@mui/material";
import { useAppSettingsContext } from "@/hooks/use-app-settings";
import { Card } from "@/components/core/cards";
import PersonalQuestAutocomplete from "@/components/profile/personal-quest-autocomplete";

const defaultPersonalQuestCardImageUrl = "/personal-quests/gloomhaven/gh-pq-back.webp";

interface PersonalQuestProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const PersonalQuest = ({ character, setCharacter }: PersonalQuestProps) => {
    const personalQuestImageUrl = character.personalQuest?.imageUrl ?? defaultPersonalQuestCardImageUrl;

    const personalQuestAltText = character.personalQuest
        ? `Personal quest ${character.personalQuest.name}`
        : "Personal quest";

    return (
        <Box display="flex" flexDirection="column" gap={1}>
            <Card src={personalQuestImageUrl} altText={personalQuestAltText} />
            <PersonalQuestAutocomplete character={character} setCharacter={setCharacter} />
        </Box>
    );
};

export default PersonalQuest;
