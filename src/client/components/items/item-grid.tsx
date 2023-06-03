import type { Dispatch, SetStateAction } from "react";
import { Box } from "@mui/material";
import Item from "@/client/components/items/item";
import { orderItems } from "@/client/services/items";
import { useSettingsContext } from "@/client/hooks/use-settings";

interface ItemGridProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const ItemGrid = ({ character, setCharacter }: ItemGridProps) => {
    const [settings] = useSettingsContext();

    return (
        <Box
            component="section"
            aria-label="Item Grid"
            sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        >
            {orderItems(character.items, settings.gameData.itemSlots).map((characterItem: CharacterItem) => (
                <Item
                    key={characterItem.id}
                    character={character}
                    setCharacter={setCharacter}
                    characterItem={characterItem}
                />
            ))}
        </Box>
    );
};

export default ItemGrid;
