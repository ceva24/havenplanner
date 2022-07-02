/* eslint-disable @typescript-eslint/ban-types */
import { Autocomplete, AutocompleteRenderInputParams, FormControl, TextField } from "@mui/material";
import { SetStateAction, SyntheticEvent, Dispatch } from "react";
import { personalQuests } from "@/utils/constants";

interface PersonalQuestSelectProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const PersonalQuestAutocomplete = ({ character, setCharacter }: PersonalQuestSelectProps) => {
    const handleChange = (event: SyntheticEvent, value: PersonalQuestAutocompleteEntry | null) => {
        findAndSetPersonalQuest(value, character, setCharacter);
    };

    return (
        <FormControl sx={{ width: "100%" }}>
            <Autocomplete
                disablePortal
                value={convertPersonalQuestToAutocompleteEntries(character.personalQuest)}
                options={getPersonalQuestAutocompleteEntries()}
                renderInput={(props: AutocompleteRenderInputParams) => <TextField {...props} label="Personal quest" />}
                onChange={handleChange}
            />
        </FormControl>
    );
};

interface PersonalQuestAutocompleteEntry {
    label: string;
}

const getPersonalQuestAutocompleteEntries = (): PersonalQuestAutocompleteEntry[] => {
    return personalQuests.map((personalQuest: PersonalQuest) => {
        return convertPersonalQuestToAutocompleteEntries(personalQuest);
    });
};

const convertPersonalQuestToAutocompleteEntries = (
    personalQuest: PersonalQuest | undefined
): PersonalQuestAutocompleteEntry => {
    return { label: personalQuest?.name ?? "" };
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
