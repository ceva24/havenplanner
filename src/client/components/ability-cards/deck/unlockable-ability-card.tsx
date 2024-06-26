import type { Dispatch, SetStateAction } from "react";
import DisabledAbilityCard from "@/client/components/ability-cards/disabled-ability-card";
import ToggleableAbilityCard from "@/client/components/ability-cards/toggleable-ability-card";
import { abilityCardCanBeToggled, isUnlockedAbilityCardForCharacter } from "@/client/services/ability-cards/deck";

interface UnlockableAbilityCardProperties {
    readonly abilityCard: AbilityCard;
    readonly character: Character;
    readonly setCharacter: Dispatch<SetStateAction<Character>>;
}

const UnlockableAbilityCard = ({ abilityCard, character, setCharacter }: UnlockableAbilityCardProperties) => {
    if (abilityCardCanBeToggled(abilityCard, character)) {
        return (
            <ToggleableAbilityCard
                showLockIcon
                abilityCard={abilityCard}
                character={character}
                isSelected={isUnlockedAbilityCardForCharacter(character, abilityCard)}
                action={() => {
                    toggleAbilityCard(character, setCharacter, abilityCard);
                }}
            />
        );
    }

    return (
        <DisabledAbilityCard
            abilityCard={abilityCard}
            character={character}
            tooltipText="Cannot unlock this ability card"
        />
    );
};

const toggleAbilityCard = (
    character: Character,
    setCharacter: Dispatch<SetStateAction<Character>>,
    abilityCard: AbilityCard,
) => {
    const updatedCharacter: Character = isUnlockedAbilityCardForCharacter(character, abilityCard)
        ? {
              ...character,
              unlockedAbilityCards: character.unlockedAbilityCards.filter(
                  (card: AbilityCard) => card.id !== abilityCard.id,
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
