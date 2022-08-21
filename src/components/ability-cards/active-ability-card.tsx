import { Dispatch, SetStateAction, KeyboardEvent } from "react";
import LockIcon from "@mui/icons-material/LockTwoTone";
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
        <div
            role="checkbox"
            aria-checked={isSelected}
            tabIndex={0}
            style={{ opacity: isSelected ? 1 : 0.5, cursor: "pointer", position: "relative" }}
            onClick={onClick}
            onKeyDown={onKeyDown}
        >
            <Card src={abilityCard.imageUrl} altText={abilityCard.name} />
            {!isSelected && <LockIcon sx={{ position: "absolute", top: 3, right: 1 }} />}
        </div>
    );
};

const toggleAbilityCard = (
    character: Character,
    setCharacter: Dispatch<SetStateAction<Character>>,
    abilityCard: AbilityCard
) => {
    const updatedCards = isUnlockedAbilityCardForCharacter(character, abilityCard)
        ? character.unlockedAbilityCards.filter((card: AbilityCard) => card !== abilityCard)
        : character.unlockedAbilityCards.concat([abilityCard]);

    setCharacter({
        ...character,
        unlockedAbilityCards: updatedCards,
    });
};

export default ActiveAbilityCard;
export { toggleAbilityCard };
