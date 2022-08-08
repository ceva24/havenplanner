import { Box } from "@mui/material";
import CardGroup from "@/components/ability-cards/card-group";

interface AbilityCardsProps {
    character: Character;
}

const AbilityCards = ({ character }: AbilityCardsProps) => {
    return (
        <Box>
            <CardGroup level="1" cards={character.characterClass.abilityCards} />
            <CardGroup level="X" cards={character.characterClass.abilityCards} />
        </Box>
    );
};

export default AbilityCards;
