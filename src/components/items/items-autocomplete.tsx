import type { Dispatch, HTMLAttributes, SetStateAction, SyntheticEvent } from "react";
import { Autocomplete, type AutocompleteRenderInputParams, Box, FormControl, TextField } from "@mui/material";
import { v4 as uuid } from "uuid";
import { items } from "@/loaders/items";
import Image from "@/components/core/image";

const itemOrder = ["Two Hand", "One Hand", "Head", "Chest", "Legs", "Bag"];

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
                renderOption={(props: HTMLAttributes<HTMLLIElement>, item: Item) => (
                    <Box component="li" sx={{ "& > picture": { marginRight: 2, flexShrink: 0 } }} {...props}>
                        <Image
                            webpPath={item.slotImageUrl}
                            fallbackImageType="png"
                            altText={item.slot}
                            style={{ verticalAlign: "middle" }}
                            height={30}
                            width={30}
                            aria-hidden="true"
                        />
                        {item.name}
                    </Box>
                )}
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
            items: orderItems(character.items.concat([characterItem])),
        };

        setCharacter(newCharacter);
    }
};

const orderItems = (characterItems: CharacterItem[]): CharacterItem[] => {
    return characterItems
        .slice()
        .sort(
            (a: CharacterItem, b: CharacterItem) =>
                itemOrder.indexOf(a.item.slot) - itemOrder.indexOf(b.item.slot) ||
                a.item.name.localeCompare(b.item.name, ["en"])
        );
};

export default ItemsAutocomplete;
export { addItem, orderItems };
