import { Dispatch, SetStateAction } from "react";
import { abilityCardCanBeUnlockedForCharacter, isUnlockedAbilityCardForCharacter } from "@/services/character";
import DisabledAbilityCard from "@/components/ability-cards/disabled-ability-card";
import ActiveAbilityCard from "@/components/ability-cards/active-ability-card";

interface UnlockableAbilityCardProps {
    abilityCard: AbilityCard;
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const UnlockableAbilityCard = ({ abilityCard, character, setCharacter }: UnlockableAbilityCardProps) => {
    if (abilityCardCanBeToggled(abilityCard, character)) {
        return (
            <ActiveAbilityCard
                showLockIcon
                abilityCard={abilityCard}
                isSelected={isUnlockedAbilityCardForCharacter(character, abilityCard)}
                action={() => {
                    toggleAbilityCard(character, setCharacter, abilityCard);
                }}
            />
        );
    }

    return <DisabledAbilityCard abilityCard={abilityCard} tooltipText="Cannot unlock this ability card" />;
};

const abilityCardCanBeToggled = (abilityCard: AbilityCard, character: Character): boolean => {
    return (
        isUnlockedAbilityCardForCharacter(character, abilityCard) ||
        abilityCardCanBeUnlockedForCharacter(character, abilityCard)
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

export default UnlockableAbilityCard;
export { toggleAbilityCard };
