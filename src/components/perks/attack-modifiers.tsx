import cloneDeep from "lodash.clonedeep";
import partition from "lodash.partition";
import { Box } from "@mui/material";
import AttackModifiersGrid from "@/components/perks/attack-modifiers-grid";
import { baseAttackModifierDeck } from "@/constants";

const baseAttackModifierDeckOrder = ["2x", "+2", "+1", "+0", "-1", "-2", "Miss"];

interface AttackModifiersProps {
    character: Character;
}

const AttackModifiers = ({ character }: AttackModifiersProps) => {
    const attackModifierDeckWithPerks = applyPerksTo(baseAttackModifierDeck, character.gainedPerks);

    const classAttackModifierDeckOrder: string[] = Array.from(
        new Set(
            character.characterClass.perks
                .flatMap((perk: Perk) => perk.add)
                .map((attackModifierCard: AttackModifierCard) => attackModifierCard.name)
                .filter((name: string) => !baseAttackModifierDeckOrder.includes(name))
        )
    );

    const [initialAttackModifiers, classAttackModifiers] =
        splitAttackModifierDeckIntoBaseAndClass(attackModifierDeckWithPerks);

    return (
        <Box component="section" aria-label="Attack Modifier Deck">
            <AttackModifiersGrid deck={initialAttackModifiers} orderedCardNames={baseAttackModifierDeckOrder} />
            <AttackModifiersGrid deck={classAttackModifiers} orderedCardNames={classAttackModifierDeckOrder} />
        </Box>
    );
};

const applyPerksTo = (
    attackModifierDeck: AttackModifierDeckCard[],
    gainedPerks: GainedPerk[]
): AttackModifierDeckCard[] => {
    const attackModifierDeckWithPerks = cloneDeep(attackModifierDeck);

    const sortedGainedPerks = gainedPerks.sort((a: GainedPerk, b: GainedPerk) => a.perk.id - b.perk.id);

    sortedGainedPerks.forEach((gainedPerk: GainedPerk) => {
        applyChangesOfPerkTo(attackModifierDeckWithPerks, gainedPerk.perk);
    });

    return attackModifierDeckWithPerks;
};

const applyChangesOfPerkTo = (attackModifierDeck: AttackModifierDeckCard[], perk: Perk) => {
    perk.add.forEach((attackModifierCard: AttackModifierCard) => {
        applyAttackModifierAdditionsTo(attackModifierDeck, attackModifierCard);
    });

    perk.remove.forEach((attackModifierCard: AttackModifierCard) => {
        applyAttackModifierRemovalsTo(attackModifierDeck, attackModifierCard);
    });
};

const applyAttackModifierAdditionsTo = (
    attackModifierDeck: AttackModifierDeckCard[],
    cardToAdd: AttackModifierCard
) => {
    const attackModifierDeckCardToAddTo = attackModifierDeck.find(
        (attackModifierDeckCard: AttackModifierDeckCard) => attackModifierDeckCard.card.id === cardToAdd.id
    );

    if (attackModifierDeckCardToAddTo) {
        attackModifierDeckCardToAddTo.count++;
    } else {
        attackModifierDeck.push({
            card: cardToAdd,
            count: 1,
        });
    }
};

const applyAttackModifierRemovalsTo = (
    attackModifierDeck: AttackModifierDeckCard[],
    cardToRemove: AttackModifierCard
) => {
    const attackModifierDeckCardToRemoveFrom = attackModifierDeck.find(
        (attackModifierDeckCard: AttackModifierDeckCard) => attackModifierDeckCard.card.id === cardToRemove.id
    );

    if (!attackModifierDeckCardToRemoveFrom) return;

    if (attackModifierDeckCardToRemoveFrom.count > 1) {
        attackModifierDeckCardToRemoveFrom.count--;
    } else {
        const indexOfCardToRemove = attackModifierDeck.indexOf(attackModifierDeckCardToRemoveFrom);
        attackModifierDeck.splice(indexOfCardToRemove, 1);
    }
};

const splitAttackModifierDeckIntoBaseAndClass = (
    deck: AttackModifierDeckCard[]
): [AttackModifierDeckCard[], AttackModifierDeckCard[]] => {
    return partition(deck, (card: AttackModifierDeckCard) =>
        baseAttackModifierDeck.some((baseCard: AttackModifierDeckCard) => card.card.id === baseCard.card.id)
    );
};

export default AttackModifiers;
export { applyPerksTo, splitAttackModifierDeckIntoBaseAndClass };
