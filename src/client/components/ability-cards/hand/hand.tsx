import { Box } from "@mui/material";
import { Card } from "@/client/components/core/cards";
import { Button } from "@/client/components/core/button";
import AbilityCard from "@/client/components/ability-cards/ability-card";

interface HandProps {
    character: Character;
    openEditHandDialog: () => void;
}

const Hand = ({ character, openEditHandDialog }: HandProps) => {
    const emptyHand: unknown[] = Array.from({
        length: character.characterClass.handSize - character.hand.length,
    });

    return (
        <Box>
            <Box textAlign="center">
                <Button text="Edit hand" onClick={openEditHandDialog} />
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", paddingBottom: 3 }}>
                {character.hand
                    .sort((a: AbilityCard, b: AbilityCard) => a.id - b.id)
                    .map((abilityCard: AbilityCard) => (
                        <Box key={abilityCard.id} sx={{ margin: 1 }}>
                            <AbilityCard abilityCard={abilityCard} character={character} />
                        </Box>
                    ))}
                {emptyHand.map((abilityCard: unknown, index: number) => {
                    return (
                        // eslint-disable-next-line react/no-array-index-key
                        <Box key={index} sx={{ opacity: 0.5, margin: 1 }}>
                            <Card src={character.characterClass.cardBackImageUrl} altText="Unselected card" />
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default Hand;
