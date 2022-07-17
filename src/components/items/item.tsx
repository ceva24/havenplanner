import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Dispatch, SetStateAction } from "react";
import { SmallCard } from "@/components/cards";

interface ItemProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
    characterItem: CharacterItem;
    index: number;
}

const Item = ({ character, setCharacter, characterItem, index }: ItemProps) => {
    const onClick = () => {
        removeItem(character, setCharacter, characterItem);
    };

    return (
        <Box sx={{ margin: 1 }}>
            <SmallCard src={characterItem.item.imageUrl} altText={characterItem.item.name} />
            <Box>
                <IconButton
                    aria-label={`Delete item ${index + 1} - ${characterItem.item.name}`}
                    sx={{ color: "secondary.main" }}
                    onClick={onClick}
                >
                    <DeleteIcon />
                </IconButton>
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
        items: character.items.filter((characterItem: CharacterItem) => {
            return characterItem.id !== characterItemToRemove.id;
        }),
    };

    setCharacter(newCharacter);
};

export default Item;
export { removeItem };
