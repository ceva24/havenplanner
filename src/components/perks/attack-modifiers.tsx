import { Box } from "@mui/material";
import AttackModifiersGrid from "@/components/perks/attack-modifiers-grid";
import { applyPerksTo } from "@/services/perks/perk";
import {
    baseAttackModifierDeckOrder,
    classAttackModifierCardNames,
    splitAttackModifierDeckIntoBaseAndClass,
} from "@/services/perks/attack-modifier";
import { useSettingsContext } from "@/hooks/use-settings";

interface AttackModifiersProps {
    character: Character;
}

const AttackModifiers = ({ character }: AttackModifiersProps) => {
    const [settings] = useSettingsContext();

    const attackModifierDeckWithPerks = applyPerksTo(settings.gameData.baseAttackModifierDeck, character.gainedPerks);

    const [initialAttackModifiers, classAttackModifiers] = splitAttackModifierDeckIntoBaseAndClass(
        attackModifierDeckWithPerks,
        settings.gameData.baseAttackModifierDeck
    );

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
