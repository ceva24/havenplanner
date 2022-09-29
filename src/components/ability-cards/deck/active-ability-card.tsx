import { Dispatch, SetStateAction, KeyboardEvent } from "react";
import LockIcon from "@mui/icons-material/LockTwoTone";
import { Box } from "@mui/material";
import { Card } from "@/components/core/cards";
import { isUnlockedAbilityCardForCharacter } from "@/services/character";

interface ActiveAbilityCardProps {
    abilityCard: AbilityCard;
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const ActiveAbilityCard = ({ abilityCard, character, setCharacter }: ActiveAbilityCardProps) => {
    const isSelected = isUnlockedAbilityCardForCharacter(character, abilityCard);

    const onClick = () => {
        toggleAbilityCard(character, setCharacter, abilityCard);
    };

    const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
        if (["Space", "Enter"].includes(event.code)) {
            event.preventDefault();
            toggleAbilityCard(character, setCharacter, abilityCard);
        }
    };

    return (
        <Box
            role="checkbox"
            aria-checked={isSelected}
            tabIndex={0}
            sx={{ opacity: isSelected ? 1 : 0.5, cursor: "pointer", position: "relative" }}
            onClick={onClick}
            onKeyDown={onKeyDown}
        >
            <Card src={abilityCard.imageUrl} altText={abilityCard.name} />
            {!isSelected && <LockIcon sx={{ position: "absolute", top: 3, right: 1 }} />}
        </Box>
    );
};

const toggleAbilityCard = (
    character: Character,
    setCharacter: Dispatch<SetStateAction<Character>>,
    abilityCard: AbilityCard
) => {
    const updatedCharacter: Character = isUnlockedAbilityCardForCharacter(character, abilityCard)
        ? {
              ...character,
              unlockedAbilityCards: character.unlockedAbilityCards.filter(
                  (card: AbilityCard) => card.id !== abilityCard.id
              ),
              hand: character.hand.filter((card: AbilityCard) => card.id !== abilityCard.id),
          }
        : {
              ...character,
              unlockedAbilityCards: character.unlockedAbilityCards.concat([abilityCard]),
          };

    setCharacter(updatedCharacter);
};

export default ActiveAbilityCard;
export { toggleAbilityCard };
