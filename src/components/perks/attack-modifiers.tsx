import { Box } from "@mui/material";
import AttackModifiersGrid from "@/components/perks/attack-modifiers-grid";
import { baseAttackModifierDeck } from "@/constants";
import { applyPerksTo } from "@/services/perks/perk";
import {
    baseAttackModifierDeckOrder,
    classAttackModifierCardNames,
    splitAttackModifierDeckIntoBaseAndClass,
} from "@/services/perks/attack-modifier";

interface AttackModifiersProps {
    character: Character;
}

const AttackModifiers = ({ character }: AttackModifiersProps) => {
    const attackModifierDeckWithPerks = applyPerksTo(baseAttackModifierDeck, character.gainedPerks);

    const [initialAttackModifiers, classAttackModifiers] =
        splitAttackModifierDeckIntoBaseAndClass(attackModifierDeckWithPerks);

    return (
        <Box component="section" aria-label="Attack Modifier Deck">
            <AttackModifiersGrid deck={initialAttackModifiers} orderedCardNames={baseAttackModifierDeckOrder} />
            <AttackModifiersGrid
                deck={classAttackModifiers}
                orderedCardNames={classAttackModifierCardNames(character.characterClass)}
            />
        </Box>
    );
};

export default AttackModifiers;
