import { Grid } from "@mui/material";
import groupBy from "lodash.groupby";
import AbilityCardGroup from "@/components/ability-cards/ability-card-group";

const abilityCardGroupOrder = ["1", "X", "2", "3", "4", "5", "6", "7", "8", "9"];

interface AbilityCardsProps {
    character: Character;
}

const AbilityCards = ({ character }: AbilityCardsProps) => {
    const cardsByLevel = groupBy(
        character.characterClass.abilityCards,
        (abilityCard: AbilityCard) => abilityCard.level
    );

    const uniqueLevels = Object.keys(cardsByLevel);

    const orderedLevels = uniqueLevels
        .slice()
        .sort((a: string, b: string) => abilityCardGroupOrder.indexOf(a) - abilityCardGroupOrder.indexOf(b));

    return (
        <Grid container>
            {orderedLevels.map((level: string) => {
                const cards = cardsByLevel[level];
                const gridItemSize = cards.length <= 2 ? 6 : 12;

                return (
                    <Grid key={level} item xl={gridItemSize} width="100%">
                        <AbilityCardGroup level={level} cards={cards} />
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default AbilityCards;
