import type { Dispatch, SetStateAction } from "react";
import { Grid } from "@mui/material";
import AbilityCardGroup from "@/client/components/ability-cards/deck/ability-card-group";
import {
    abilityCardLevelIsSelectable,
    groupCharacterCardsByLevel,
    uniqueOrderedCardLevels,
} from "@/client/services/ability-cards/deck";

interface DeckProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const Deck = ({ character, setCharacter }: DeckProps) => {
    const cardsByLevel = groupCharacterCardsByLevel(character);
    const orderedLevels = uniqueOrderedCardLevels(cardsByLevel);

    return (
        <Grid container>
            {orderedLevels.map((level: string) => {
                const cards = cardsByLevel[level];
                const isSelectable = abilityCardLevelIsSelectable(level);
                const gridItemSize = isSelectable ? 6 : 12;

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

export default Deck;
