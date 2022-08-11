import { Box } from "@mui/material";
import groupBy from "lodash.groupby";
import AbilityCardGroup from "@/components/ability-cards/ability-card-group";

interface AbilityCardsProps {
    character: Character;
}

const AbilityCards = ({ character }: AbilityCardsProps) => {
    const cardsByLevel = groupBy(
        character.characterClass.abilityCards,
        (abilityCard: AbilityCard) => abilityCard.level
    );
    const uniqueLevels = Object.keys(cardsByLevel);

    return (
        <Box>
            {uniqueLevels.map((level: string) => {
                return <AbilityCardGroup key={level} level={level} cards={cardsByLevel[level]} />;
            })}
        </Box>
    );
};

export default AbilityCards;
