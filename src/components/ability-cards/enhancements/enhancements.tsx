import { type Dispatch, type SetStateAction } from "react";
import { Box } from "@mui/material";
import EnhancementsAutocomplete from "@/components/ability-cards/enhancements/enhancements-autocomplete";
import AbilityCard from "@/components/ability-cards/ability-card";

interface EnhancementsProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const Enhancements = ({ character, setCharacter }: EnhancementsProps) => {
    return (
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {character.characterClass.abilityCards
                .sort((a: AbilityCard, b: AbilityCard) => a.id - b.id)
                .map((abilityCard: AbilityCard) => (
                    <Box
                        key={abilityCard.id}
                        component="section"
                        aria-label={`${abilityCard.name} Enhancements`}
                        sx={{ margin: 1 }}
                    >
                        <AbilityCard abilityCard={abilityCard} character={character} />
                        {abilityCard.enhancementSlots.map((slotType: string, slot: number) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <Box key={`${abilityCard.id}-${slot}`} marginTop={1} marginBottom={1}>
                                <EnhancementsAutocomplete
                                    slotType={slotType}
                                    abilityCard={abilityCard}
                                    slot={slot}
                                    character={character}
                                    setCharacter={setCharacter}
                                />
                            </Box>
                        ))}
                    </Box>
                ))}
        </Box>
    );
};

export default Enhancements;
