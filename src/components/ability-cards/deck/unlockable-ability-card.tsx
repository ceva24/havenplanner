import { Dispatch, SetStateAction } from "react";
import { abilityCardCanBeUnlockedForCharacter, isUnlockedAbilityCardForCharacter } from "@/services/character";
import ActiveAbilityCard from "@/components/ability-cards/deck/active-ability-card";
import DisabledAbilityCard from "@/components/ability-cards/deck/disabled-ability-card";

interface UnlockableAbilityCardProps {
    abilityCard: AbilityCard;
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const UnlockableAbilityCard = ({ abilityCard, character, setCharacter }: UnlockableAbilityCardProps) => {
    if (abilityCardCanBeToggled(abilityCard, character)) {
        return <ActiveAbilityCard abilityCard={abilityCard} character={character} setCharacter={setCharacter} />;
    }

    return <DisabledAbilityCard abilityCard={abilityCard} />;
};

const abilityCardCanBeToggled = (abilityCard: AbilityCard, character: Character): boolean => {
    return (
        isUnlockedAbilityCardForCharacter(character, abilityCard) ||
        abilityCardCanBeUnlockedForCharacter(character, abilityCard)
    );
};

export default UnlockableAbilityCard;
