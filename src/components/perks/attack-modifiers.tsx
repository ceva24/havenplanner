import { Box } from "@mui/material";
import AttackModifiersGrid from "./attack-modifiers-grid";
import { baseAttackModifierDeck } from "@/constants";

const baseAttackModifierDeckOrder = ["2x", "+2", "+1", "+0", "-1", "-2", "Miss"];

interface AttackModifiersProps {
    character: Character;
}

const AttackModifiers = ({ character }: AttackModifiersProps) => {
    const classAttackModifierDeckOrder: string[] = Array.from(
        new Set(
            character.characterClass.perks
                .flatMap((perk: Perk) => perk.add)
                .map((attackModifierCard: AttackModifierCard) => attackModifierCard.name)
                .filter((name: string) => !baseAttackModifierDeckOrder.includes(name))
        )
    );

    return (
        <Box component="section" aria-label="Attack Modifier Deck">
            <AttackModifiersGrid
                initialDeck={baseAttackModifierDeck}
                gainedPerks={character.gainedPerks}
                orderedCardNames={baseAttackModifierDeckOrder}
            />
            <AttackModifiersGrid
                initialDeck={[]}
                gainedPerks={character.gainedPerks}
                orderedCardNames={classAttackModifierDeckOrder}
            />
        </Box>
    );
};

export default AttackModifiers;
