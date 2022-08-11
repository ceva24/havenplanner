import { Box, Typography } from "@mui/material";
import { Card } from "@/components/cards";

interface AbilityCardGroupProps {
    level: string;
    cards: AbilityCard[];
}

const AbilityCardGroup = ({ level, cards }: AbilityCardGroupProps) => {
    return (
        <Box sx={{ textAlign: "center" }}>
            <Typography color="textPrimary" variant="h2" padding={3} paddingTop={0}>
                Level {level}
            </Typography>
            <Box
                component="section"
                aria-label={`Level ${level} Ability Cards`}
                paddingBottom={3}
                sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
            >
                {cards.map((abilityCard: AbilityCard) => {
                    return (
                        <Box key={abilityCard.id} sx={{ margin: 1 }}>
                            <Card src={abilityCard.imageUrl} altText={abilityCard.name} />
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default AbilityCardGroup;
