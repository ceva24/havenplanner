/* eslint-disable @typescript-eslint/ban-types */
import { SetStateAction, SyntheticEvent, Dispatch } from "react";
import { Autocomplete, AutocompleteRenderInputParams, TextField } from "@mui/material";
import { personalQuests } from "@/loaders/personal-quests";

interface PersonalQuestAutocompleteProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const PersonalQuestAutocomplete = ({ character, setCharacter }: PersonalQuestAutocompleteProps) => {
    const handleChange = (event: SyntheticEvent, value: PersonalQuest | null) => {
        findAndSetPersonalQuest(value, character, setCharacter);
    };

    return (
        <Autocomplete
            disablePortal
            value={character.personalQuest ?? null}
            options={personalQuests}
            getOptionLabel={(personalQuest: PersonalQuest) => {
                return personalQuest.name;
            }}
            renderInput={(props: AutocompleteRenderInputParams) => <TextField {...props} label="Personal quest" />}
            onChange={handleChange}
        />
    );
};

const findAndSetPersonalQuest = (
    personalQuestToSet: PersonalQuest | null,
    character: Character,
    setCharacter: Dispatch<SetStateAction<Character>>
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
