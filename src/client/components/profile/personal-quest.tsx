import type { Dispatch, SetStateAction } from "react";
import { Box } from "@mui/material";
import { Card } from "@/client/components/core/cards";
import PersonalQuestAutocomplete from "@/client/components/profile/personal-quest-autocomplete";

const defaultPersonalQuestCardImageUrl = "/personal-quests/gloomhaven/gh-pq-back.webp";

interface PersonalQuestProperties {
    readonly character: Character;
    readonly setCharacter: Dispatch<SetStateAction<Character>>;
}

const PersonalQuest = ({ character, setCharacter }: PersonalQuestProperties) => {
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
