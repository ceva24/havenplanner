import { Box } from "@mui/material";
import AttackModifiersGrid from "@/client/components/perks/attack-modifiers-grid";
import { applyPerksTo } from "@/client/services/perks/perk";
import {
    type SplitAttackModifiers,
    baseAttackModifierDeckOrder,
    classAttackModifierCardNames,
    splitAttackModifierDeckIntoBaseAndClass,
} from "@/client/services/perks/attack-modifier";
import { useSettingsContext } from "@/client/hooks/use-settings";
import { applyItemEffectsTo } from "@/client/services/items";

interface AttackModifiersProperties {
    readonly character: Character;
}

const AttackModifiers = ({ character }: AttackModifiersProperties) => {
    const [settings] = useSettingsContext();

    const attackModifierDeckWithPerks = applyPerksTo(settings.gameData.baseAttackModifierDeck, character.gainedPerks);
    const attackModifierDeckWithPerksAndItemEffects = applyItemEffectsTo(attackModifierDeckWithPerks, character.items);

    const splitAttackModifiers: SplitAttackModifiers = splitAttackModifierDeckIntoBaseAndClass(
        attackModifierDeckWithPerksAndItemEffects,
        settings.gameData.baseAttackModifierDeck,
    );

    return (
        <Box component="section" aria-label="Attack Modifier Deck">
            <AttackModifiersGrid
                deck={splitAttackModifiers.initialAttackModifiers}
                orderedCardNames={baseAttackModifierDeckOrder}
            />
            <AttackModifiersGrid
                deck={splitAttackModifiers.classAttackModifiers}
                orderedCardNames={classAttackModifierCardNames(character.characterClass)}
            />
        </Box>
    );
};

export default AttackModifiers;
