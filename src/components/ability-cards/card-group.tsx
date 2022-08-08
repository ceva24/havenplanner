import { Box, Typography } from "@mui/material";
import { Card } from "@/components/cards";

interface CardGroupProps {
    level: string;
    cards: AbilityCard[];
}

const CardGroup = ({ level, cards }: CardGroupProps) => {
    const cardsForThisLevel = cards.filter((abilityCard: AbilityCard) => abilityCard.level === level);

    return (
        cardsForThisLevel && (
            <Box sx={{ textAlign: "center" }}>
                <Typography color="textPrimary" variant="h2" padding={3} paddingTop={0}>
                    Level {level}
                </Typography>
                <Box
                    component="section"
                    aria-label={`Ability Card Level ${level} Grid`}
                    paddingBottom={3}
                    sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
                >
                    {cardsForThisLevel.map((abilityCard: AbilityCard) => {
                        return (
                            <Box key={abilityCard.id} sx={{ margin: 1 }}>
                                <Card src={abilityCard.imageUrl} altText={abilityCard.name} />
                            </Box>
                        );
                    })}
                </Box>
            </Box>
        )
    );
};

export default CardGroup;
