import cloneDeep from "lodash.clonedeep";
import { Box, Grid, Typography } from "@mui/material";
import { WideCard } from "@/components/core/cards";

interface AttackModifiersGridProps {
    initialDeck: AttackModifierDeckCard[];
    gainedPerks: GainedPerk[];
    orderedCardNames: string[];
}

const AttackModifiersGrid = ({ initialDeck, gainedPerks, orderedCardNames }: AttackModifiersGridProps) => {
    const attackModifierDeckWithPerks = applyPerksTo(initialDeck, gainedPerks, orderedCardNames);

    const orderedAttackModifierDeck = attackModifierDeckWithPerks
        .slice()
        .sort(
            (a: AttackModifierDeckCard, b: AttackModifierDeckCard) =>
                orderedCardNames.indexOf(a.card.name) - orderedCardNames.indexOf(b.card.name)
        );

    return (
        <Grid container spacing={10}>
            <Grid item sx={{ margin: "auto" }}>
                <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                    {orderedAttackModifierDeck.map((attackModifierDeckCard: AttackModifierDeckCard) => (
                        <Box
                            key={attackModifierDeckCard.card.id}
                            id={`attack-modifier-card-details-${attackModifierDeckCard.card.id}`}
                            sx={{ display: "flex" }}
                            margin={1}
                        >
                            <Box margin={1} sx={{ alignSelf: "center" }}>
                                <Typography variant="h2" component="p">
                                    {attackModifierDeckCard.count} x
                                </Typography>
                            </Box>
                            <Box margin={1}>
                                <WideCard
                                    src={attackModifierDeckCard.card.imageUrl}
                                    altText={`${attackModifierDeckCard.card.name} card`}
                                />
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Grid>
        </Grid>
    );
};

const applyPerksTo = (
    attackModifierDeck: AttackModifierDeckCard[],
    gainedPerks: GainedPerk[],
    orderedCardNames: string[]
): AttackModifierDeckCard[] => {
    const attackModifierDeckWithPerks = cloneDeep(attackModifierDeck);

    gainedPerks.forEach((gainedPerk: GainedPerk) => {
        applyChangesOfPerkTo(attackModifierDeckWithPerks, gainedPerk.perk, orderedCardNames);
    });

    return attackModifierDeckWithPerks;
};

const applyChangesOfPerkTo = (attackModifierDeck: AttackModifierDeckCard[], perk: Perk, orderedCardNames: string[]) => {
    perk.add.forEach((attackModifierCard: AttackModifierCard) => {
        if (orderedCardNames.includes(attackModifierCard.name))
            applyAttackModifierAdditionsTo(attackModifierDeck, attackModifierCard);
    });

    perk.remove.forEach((attackModifierCard: AttackModifierCard) => {
        if (orderedCardNames.includes(attackModifierCard.name))
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

export default AttackModifiersGrid;
export { applyPerksTo };
