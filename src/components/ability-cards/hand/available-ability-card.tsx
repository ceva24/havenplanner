import { Dispatch, KeyboardEvent, SetStateAction } from "react";
import { Box } from "@mui/material";
import { Card } from "@/components/core/cards";

interface AvailableAbilityCardProps {
    abilityCard: AbilityCard;
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const AvailableAbilityCard = ({ abilityCard, character, setCharacter }: AvailableAbilityCardProps) => {
    const isSelected = character.hand.includes(abilityCard);

    const onClick = () => {
        toggleCardAddedToHand(character, setCharacter, abilityCard);
    };

    const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
        if (["Space", "Enter"].includes(event.code)) {
            event.preventDefault();
            toggleCardAddedToHand(character, setCharacter, abilityCard);
        }
    };

    return (
        <Box
            key={abilityCard.id}
            role="checkbox"
            aria-checked={isSelected}
            tabIndex={0}
            sx={{ opacity: isSelected ? 1 : 0.5, cursor: "pointer", position: "relative" }}
            onClick={onClick}
            onKeyDown={onKeyDown}
        >
            <Card src={abilityCard.imageUrl} altText={abilityCard.name} />
        </Box>
    );
};

const toggleCardAddedToHand = (
    character: Character,
    setCharacter: Dispatch<SetStateAction<Character>>,
    abilityCard: AbilityCard
) => {
    if (wouldBeExceedingHandSizeLimit(character, abilityCard)) return;

    const newHand = character.hand.includes(abilityCard)
        ? character.hand.filter((card: AbilityCard) => card.id !== abilityCard.id)
        : character.hand.concat([abilityCard]);

    setCharacter({
        ...character,
        hand: newHand,
    });
};

const wouldBeExceedingHandSizeLimit = (character: Character, abilityCard: AbilityCard) => {
    return !character.hand.includes(abilityCard) && character.hand.length === character.characterClass.handSize;
};

export default AvailableAbilityCard;
export { toggleCardAddedToHand };
