import { Box, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import UnlockableAbilityCard from "@/components/ability-cards/deck/unlockable-ability-card";
import { Card } from "@/components/core/cards";

interface AbilityCardGroupProps {
    level: string;
    cards: AbilityCard[];
    isSelectable: boolean;
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const AbilityCardGroup = ({ level, cards, isSelectable, character, setCharacter }: AbilityCardGroupProps) => {
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
                {cards.map((abilityCard: AbilityCard) => (
                    <Box key={abilityCard.id} sx={{ margin: 1 }}>
                        {isSelectable ? (
                            <UnlockableAbilityCard
                                abilityCard={abilityCard}
                                character={character}
                                setCharacter={setCharacter}
                            />
                        ) : (
                            <Card src={abilityCard.imageUrl} altText={abilityCard.name} />
                        )}
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default AbilityCardGroup;
