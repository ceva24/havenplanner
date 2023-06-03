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
import Image from "@/client/components/core/image";
import { useSettingsContext } from "@/client/hooks/use-settings";
import { useItems, type UseItems } from "@/client/hooks/data/use-items";
import { getItemSlotImageUrlForSlotName } from "@/client/services/items";
import { itemsAreCompletelySpoiled } from "@/client/services/spoiler";

interface ItemsAutocompleteProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const ItemsAutocomplete = ({ character, setCharacter }: ItemsAutocompleteProps) => {
    const [settings] = useSettingsContext();
    const { items, isLoading, isError }: UseItems = useItems(settings);

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
                options={items ?? []}
                noOptionsText={noOptionsText(isLoading, isError, settings)}
                getOptionLabel={(item: Item) => {
                    return `${item.name} ${formattedItemId(item.id)}`;
                }}
                renderOption={(props: HTMLAttributes<HTMLLIElement>, item: Item) => (
                    <Box component="li" display="flex" {...props}>
                        <Box sx={{ marginRight: 2, flexShrink: 0 }}>
                            <Image
                                webpPath={getItemSlotImageUrlForSlotName(item.slot, settings.gameData.itemSlots)}
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

const noOptionsText = (isLoading: boolean, isError: boolean, settings: Settings) => {
    switch (true) {
        case isError:
            return "Failed to load items";
        case isLoading:
            return "Loading...";
        case !itemsAreCompletelySpoiled(settings):
            return "No options - check your spoiler settings";
        default:
            return "No options";
    }
};

const formattedItemId = (id: number): string => {
    return String(id).padStart(3, "0");
};

// eslint-disable-next-line @typescript-eslint/ban-types
const addItem = (item: Item | null, character: Character, setCharacter: Dispatch<SetStateAction<Character>>) => {
    if (item?.id) {
        const characterItem: CharacterItem = { id: uuid(), item, showAlternativeImage: false };

        const newCharacter = {
            ...character,
            items: character.items.concat([characterItem]),
        };

        setCharacter(newCharacter);
    }
};

export default ItemsAutocomplete;
export { formattedItemId, addItem };
