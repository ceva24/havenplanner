import type { Dispatch, SetStateAction } from "react";
import { Box } from "@mui/material";
import Item from "@/components/items/item";
import { orderItems } from "@/services/items";

interface ItemGridProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const ItemGrid = ({ character, setCharacter }: ItemGridProps) => {
    return (
        <Box
            component="section"
            aria-label="Item Grid"
            sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        >
            {orderItems(character.items).map((characterItem: CharacterItem, index: number) => (
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
