import type { Dispatch, KeyboardEvent, SetStateAction } from "react";
import { Box } from "@mui/material";
import { SmallCard } from "@/components/core/cards";
import RemoveItemButton from "@/components/items/remove-item-button";
import { getItemImageUrl } from "@/services/items";

interface ItemProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
    characterItem: CharacterItem;
}

const Item = ({ character, setCharacter, characterItem }: ItemProps) => {
    const onClick = () => {
        toggleAlternativeImageUrl(character, setCharacter, characterItem);
    };

    const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
        if (["Space", "Enter"].includes(event.code)) {
            event.preventDefault();
            toggleAlternativeImageUrl(character, setCharacter, characterItem);
        }
    };

    return (
        <Box sx={{ margin: 1, position: "relative" }}>
            <Box
                {...(characterItem.item.alternativeImageUrl && {
                    role: "button",
                    "aria-label": `Toggle Alternative Image for ${characterItem.item.name}`,
                    sx: { cursor: "pointer" },
                    onClick,
                    onKeyDown,
                    tabIndex: 0,
                })}
            >
                <SmallCard src={getItemImageUrl(characterItem)} altText={characterItem.item.name} />
            </Box>
            <RemoveItemButton character={character} setCharacter={setCharacter} characterItem={characterItem} />
        </Box>
    );
};

const toggleAlternativeImageUrl = (
    character: Character,
    setCharacter: Dispatch<SetStateAction<Character>>,
    characterItemToToggle: CharacterItem
) => {
    const itemIndex: number = character.items.findIndex((item: CharacterItem) => item.id === characterItemToToggle.id);

    if (itemIndex !== -1) {
        const newItems: CharacterItem[] = character.items.slice();

        newItems[itemIndex] = {
            ...characterItemToToggle,
            showAlternativeImage: !characterItemToToggle.showAlternativeImage,
        };

        const newCharacter: Character = {
            ...character,
            items: newItems,
        };

        setCharacter(newCharacter);
    }
};

export default Item;
export { toggleAlternativeImageUrl };
