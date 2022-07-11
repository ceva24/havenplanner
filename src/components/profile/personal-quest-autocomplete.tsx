/* eslint-disable @typescript-eslint/ban-types */
import { Autocomplete, AutocompleteRenderInputParams, FormControl, TextField } from "@mui/material";
import { SetStateAction, SyntheticEvent, Dispatch } from "react";
import { personalQuests } from "@/utils/constants";

interface PersonalQuestAutocompleteProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const PersonalQuestAutocomplete = ({ character, setCharacter }: PersonalQuestAutocompleteProps) => {
    const handleChange = (event: SyntheticEvent, value: PersonalQuestAutocompleteEntry | null) => {
        findAndSetPersonalQuest(value, character, setCharacter);
    };

    return (
        <FormControl sx={{ width: "100%" }}>
            <Autocomplete
                disablePortal
                value={convertPersonalQuestToAutocompleteEntry(character.personalQuest)}
                options={getPersonalQuestAutocompleteEntries()}
                isOptionEqualToValue={compareEntries}
                renderInput={(props: AutocompleteRenderInputParams) => <TextField {...props} label="Personal quest" />}
                onChange={handleChange}
            />
        </FormControl>
    );
};

interface PersonalQuestAutocompleteEntry {
    label: string;
}

const getPersonalQuestAutocompleteEntries = (): Array<PersonalQuestAutocompleteEntry | null> => {
    return personalQuests.map((personalQuest: PersonalQuest) => {
        return convertPersonalQuestToAutocompleteEntry(personalQuest);
    });
};

const convertPersonalQuestToAutocompleteEntry = (
    personalQuest: PersonalQuest | undefined
): PersonalQuestAutocompleteEntry | null => {
    return personalQuest?.name ? { label: personalQuest.name } : null;
};

const compareEntries = (
    option: PersonalQuestAutocompleteEntry | null,
    value: PersonalQuestAutocompleteEntry | null
) => {
    return option?.label === value?.label;
};

const findAndSetPersonalQuest = (
    personalQuestAutocompleteEntry: PersonalQuestAutocompleteEntry | null,
    character: Character,
    setCharacter: Dispatch<SetStateAction<Character>>
) => {
    const selectedPersonalQuest: PersonalQuest | undefined = personalQuests.find((personalQuest: PersonalQuest) => {
        return personalQuest.name === personalQuestAutocompleteEntry?.label;
    });

    const newCharacter = {
        ...character,
        personalQuest: selectedPersonalQuest,
    };

    setCharacter(newCharacter);
};

export default PersonalQuestAutocomplete;
export {
    getPersonalQuestAutocompleteEntries,
    convertPersonalQuestToAutocompleteEntry,
    compareEntries,
    findAndSetPersonalQuest,
};
export type { PersonalQuestAutocompleteEntry };
