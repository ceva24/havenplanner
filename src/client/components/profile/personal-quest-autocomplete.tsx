/* eslint-disable @typescript-eslint/ban-types */
import type { Dispatch, SetStateAction, SyntheticEvent } from "react";
import type { AutocompleteRenderInputParams } from "@mui/material";
import { Autocomplete, TextField } from "@mui/material";
import { useSettingsContext } from "@/client/hooks/use-settings";

interface PersonalQuestAutocompleteProperties {
    readonly character: Character;
    readonly setCharacter: Dispatch<SetStateAction<Character>>;
}

const PersonalQuestAutocomplete = ({ character, setCharacter }: PersonalQuestAutocompleteProperties) => {
    const [settings] = useSettingsContext();

    const handleChange = (event: SyntheticEvent, value: PersonalQuest | null) => {
        findAndSetPersonalQuest(value, settings.gameData.personalQuests, character, setCharacter);
    };

    return (
        <Autocomplete
            disablePortal
            value={character.personalQuest ?? null}
            options={settings.gameData.personalQuests}
            getOptionLabel={(personalQuest: PersonalQuest) => {
                return personalQuest.name;
            }}
            renderInput={(properties: AutocompleteRenderInputParams) => (
                <TextField {...properties} label="Personal quest" />
            )}
            onChange={handleChange}
        />
    );
};

const findAndSetPersonalQuest = (
    personalQuestToSet: PersonalQuest | null,
    personalQuests: PersonalQuest[],
    character: Character,
    setCharacter: Dispatch<SetStateAction<Character>>,
) => {
    const selectedPersonalQuest: PersonalQuest | undefined = personalQuests.find((personalQuest: PersonalQuest) => {
        return personalQuest.name === personalQuestToSet?.name;
    });

    const newCharacter = {
        ...character,
        personalQuest: selectedPersonalQuest,
    };

    setCharacter(newCharacter);
};

export default PersonalQuestAutocomplete;
export { findAndSetPersonalQuest };
