import { Grid } from "@mui/material";
import groupBy from "lodash.groupby";
import { Dispatch, SetStateAction } from "react";
import AbilityCardGroup from "@/components/ability-cards/ability-card-group";

const abilityCardGroupOrder = ["1", "X", "2", "3", "4", "5", "6", "7", "8", "9"];

interface AbilityCardsProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const AbilityCards = ({ character, setCharacter }: AbilityCardsProps) => {
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
                const isSelectable = abilityCardGroupOrder.indexOf(level) >= 2;

                return (
                    <Grid key={level} item xl={gridItemSize} width="100%">
                        <AbilityCardGroup
                            level={level}
                            cards={cards}
                            isSelectable={isSelectable}
                            character={character}
                            setCharacter={setCharacter}
                        />
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default AbilityCards;
