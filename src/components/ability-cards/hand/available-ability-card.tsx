import { Dispatch, KeyboardEvent, SetStateAction } from "react";
import { Box } from "@mui/material";
import { Card } from "@/components/core/cards";

interface AvailableAbilityCardProps {
    abilityCard: AbilityCard;
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
    handleClose: () => void;
}

const AvailableAbilityCard = ({ abilityCard, character, setCharacter, handleClose }: AvailableAbilityCardProps) => {
    const onClick = () => {
        addCardToHand(character, setCharacter, abilityCard);
        handleClose();
    };

    const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
        if (["Space", "Enter"].includes(event.code)) {
            event.preventDefault();
            addCardToHand(character, setCharacter, abilityCard);
            handleClose();
        }
    };

    return (
        <Box
            key={abilityCard.id}
            role="button"
            tabIndex={0}
            sx={{ cursor: "pointer", position: "relative" }}
            onClick={onClick}
            onKeyDown={onKeyDown}
        >
            <Card src={abilityCard.imageUrl} altText={abilityCard.name} />
        </Box>
    );
};

const addCardToHand = (
    character: Character,
    setCharacter: Dispatch<SetStateAction<Character>>,
    abilityCard: AbilityCard
) => {
    const newHand = character.hand.includes(abilityCard) ? character.hand : character.hand.concat([abilityCard]);

    setCharacter({
        ...character,
        hand: newHand,
    });
};

export default AvailableAbilityCard;
export { addCardToHand };
