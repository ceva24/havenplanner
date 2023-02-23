import { Box, Grid, Typography } from "@mui/material";
import { WideCard } from "@/components/core/cards";
import { orderAttackModifierCards } from "@/services/attack-modifier";

interface AttackModifiersGridProps {
    deck: AttackModifierDeckCard[];
    orderedCardNames: string[];
}

const AttackModifiersGrid = ({ deck, orderedCardNames }: AttackModifiersGridProps) => {
    const orderedAttackModifierDeck = orderAttackModifierCards(deck, orderedCardNames);

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

export default AttackModifiersGrid;
