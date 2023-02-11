import type { Dispatch, KeyboardEvent, SetStateAction } from "react";
import { Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/HighlightOffTwoTone";
import { SmallCard } from "@/components/core/cards";

interface ItemProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
    characterItem: CharacterItem;
}

const Item = ({ character, setCharacter, characterItem }: ItemProps) => {
    const onClick = () => {
        removeItem(character, setCharacter, characterItem);
    };

    const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
        if (["Space", "Enter"].includes(event.code)) {
            event.preventDefault();
            removeItem(character, setCharacter, characterItem);
        }
    };

    return (
        <Box sx={{ margin: 1, position: "relative" }}>
            <SmallCard src={characterItem.item.imageUrl} altText={characterItem.item.name} />
            <Box
                role="button"
                aria-label={`Delete ${characterItem.item.name}`}
                tabIndex={0}
                sx={{ position: "absolute", top: 3, right: 1, cursor: "pointer" }}
                onClick={onClick}
                onKeyDown={onKeyDown}
            >
                <DeleteIcon fontSize="large" />
            </Box>
        </Box>
    );
};

const removeItem = (
    character: Character,
    setCharacter: Dispatch<SetStateAction<Character>>,
    characterItemToRemove: CharacterItem
) => {
    const newCharacter = {
        ...character,
        items: character.items.filter((characterItem: CharacterItem) => characterItem.id !== characterItemToRemove.id),
    };

    setCharacter(newCharacter);
};

export default Item;
export { removeItem };
