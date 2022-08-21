import { SyntheticEvent, Dispatch, SetStateAction } from "react";
import { Autocomplete, AutocompleteRenderInputParams, FormControl, TextField } from "@mui/material";
import { v4 as uuid } from "uuid";
import { items } from "@/loaders/items";

interface ItemsAutocompleteProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const ItemsAutocomplete = ({ character, setCharacter }: ItemsAutocompleteProps) => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const handleChange = (event: SyntheticEvent, value: Item | null) => {
        addItem(value, character, setCharacter);
    };

    return (
        <FormControl sx={{ width: { xs: "100%", sm: "80%", md: "50%", lg: "35%" } }}>
            <Autocomplete
                disablePortal
                blurOnSelect
                value={null}
                options={items}
                getOptionLabel={(item: Item) => {
                    return item.name;
                }}
                renderInput={(props: AutocompleteRenderInputParams) => <TextField {...props} label="Add item" />}
                onChange={handleChange}
            />
        </FormControl>
    );
};

// eslint-disable-next-line @typescript-eslint/ban-types
const addItem = (item: Item | null, character: Character, setCharacter: Dispatch<SetStateAction<Character>>) => {
    if (item?.id) {
        const characterItem: CharacterItem = { id: uuid(), item };

        const newCharacter = {
            ...character,
            items: character.items.concat([characterItem]),
        };

        setCharacter(newCharacter);
    }
};

export default ItemsAutocomplete;
export { addItem };
