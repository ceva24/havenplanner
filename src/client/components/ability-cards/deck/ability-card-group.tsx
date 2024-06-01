import { Box, Typography } from "@mui/material";
import type { Dispatch, SetStateAction } from "react";
import UnlockableAbilityCard from "@/client/components/ability-cards/deck/unlockable-ability-card";
import AbilityCard from "@/client/components/ability-cards/ability-card";

interface AbilityCardGroupProperties {
    readonly level: string;
    readonly cards: AbilityCard[];
    readonly isSelectable: boolean;
    readonly character: Character;
    readonly setCharacter: Dispatch<SetStateAction<Character>>;
}

const AbilityCardGroup = ({ level, cards, isSelectable, character, setCharacter }: AbilityCardGroupProperties) => {
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
                            <AbilityCard abilityCard={abilityCard} character={character} />
                        )}
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default AbilityCardGroup;
