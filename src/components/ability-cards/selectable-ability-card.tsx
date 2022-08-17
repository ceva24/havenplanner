import { Dispatch, SetStateAction, KeyboardEvent } from "react";
import { Card } from "@/components/cards";

interface SelectableAbilityCardProps {
    abilityCard: AbilityCard;
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const SelectableAbilityCard = ({ abilityCard, character, setCharacter }: SelectableAbilityCardProps) => {
    const isSelected = isUnlockedAbilityCardForCharacter(character, abilityCard);

    const onClick = () => {
        toggleAbilityCardUnlock(character, setCharacter, abilityCard);
    };

    const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
        if (["Space", "Enter"].includes(event.code)) {
            event.preventDefault();
            toggleAbilityCardUnlock(character, setCharacter, abilityCard);
        }
    };

    return (
        <div
            role="checkbox"
            aria-checked={isSelected}
            tabIndex={0}
            style={{ opacity: isSelected ? 1 : 0.5, cursor: "pointer" }}
            onClick={onClick}
            onKeyDown={onKeyDown}
        >
            <Card src={abilityCard.imageUrl} altText={abilityCard.name} />
        </div>
    );
};

const toggleAbilityCardUnlock = (
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

const isUnlockedAbilityCardForCharacter = (character: Character, abilityCard: AbilityCard) => {
    return character.unlockedAbilityCards.includes(abilityCard);
};

export default SelectableAbilityCard;
export { toggleAbilityCardUnlock };
