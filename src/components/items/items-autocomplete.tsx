import type { Dispatch, HTMLAttributes, SetStateAction, SyntheticEvent } from "react";
import {
    Autocomplete,
    type AutocompleteRenderInputParams,
    Box,
    FormControl,
    TextField,
    Typography,
} from "@mui/material";
import { v4 as uuid } from "uuid";
import Image from "@/components/core/image";
import { getItems, shouldShowItemSpoilerHint } from "@/services/items";
import { useSettingsContext } from "@/hooks/use-settings";

interface ItemsAutocompleteProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const ItemsAutocomplete = ({ character, setCharacter }: ItemsAutocompleteProps) => {
    const [settings] = useSettingsContext();

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
                options={getItems(settings)}
                {...(shouldShowItemSpoilerHint(settings) && {
                    noOptionsText: "No options - check your spoiler settings",
                })}
                getOptionLabel={(item: Item) => {
                    return `${item.name} ${formattedItemId(item.id)}`;
                }}
                renderOption={(props: HTMLAttributes<HTMLLIElement>, item: Item) => (
                    <Box component="li" display="flex" {...props}>
                        <Box sx={{ marginRight: 2, flexShrink: 0 }}>
                            <Image
                                webpPath={item.slotImageUrl}
                                fallbackImageType="png"
                                altText={item.slot}
                                style={{ verticalAlign: "middle" }}
                                height={30}
                                width={30}
                                aria-hidden="true"
                            />
                        </Box>
                        <Typography>{item.name}</Typography>
                        <Typography flexGrow="1" textAlign="right" marginLeft={2}>
                            {formattedItemId(item.id)}
                        </Typography>
                    </Box>
                )}
                renderInput={(props: AutocompleteRenderInputParams) => <TextField {...props} label="Add item" />}
                onChange={handleChange}
            />
        </FormControl>
    );
};

const formattedItemId = (id: number): string => {
    return String(id).padStart(3, "0");
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
export { formattedItemId, addItem };
