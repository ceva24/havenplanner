import { Box } from "@mui/material";
import { Card } from "@/components/core/cards";

interface EnhancementsProps {
    character: Character;
}

const Enhancements = ({ character }: EnhancementsProps) => {
    return (
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {character.characterClass.abilityCards
                .sort((a: AbilityCard, b: AbilityCard) => a.id - b.id)
                .map((abilityCard: AbilityCard) => (
                    <Box key={abilityCard.id} sx={{ margin: 1 }}>
                        <Card src={abilityCard.imageUrl} altText={abilityCard.name} />
                    </Box>
                ))}
        </Box>
    );
};

export default Enhancements;
