import { type Dispatch, type SetStateAction } from "react";
import { Box } from "@mui/material";
import EnhancementsSelect from "@/client/components/ability-cards/enhancements/enhancements-select";
import AbilityCard from "@/client/components/ability-cards/ability-card";

interface EnhancementsProperties {
    readonly character: Character;
    readonly setCharacter: Dispatch<SetStateAction<Character>>;
}

const Enhancements = ({ character, setCharacter }: EnhancementsProperties) => {
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
                        {abilityCard.enhancementSlots.map((enhancementSlot: EnhancementSlot) => (
                            <Box key={`${abilityCard.id}-${enhancementSlot.id}`} marginTop={1} marginBottom={1}>
                                <EnhancementsSelect
                                    abilityCard={abilityCard}
                                    enhancementSlot={enhancementSlot}
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
