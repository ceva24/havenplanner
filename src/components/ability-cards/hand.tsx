import { Dispatch, SetStateAction } from "react";
import { Box } from "@mui/material";
import { Card } from "@/components/core/cards";

interface HandProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const Hand = ({ character, setCharacter }: HandProps) => {
    const emptyHand: Array<AbilityCard | undefined> = Array.from<AbilityCard | undefined>({
        length: character.characterClass.handSize,
    });

    return (
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {emptyHand.map((abilityCard: AbilityCard | undefined, index: number) => {
                return (
                    <Box
                        key={abilityCard?.id ?? index}
                        role="button"
                        tabIndex={0}
                        sx={{ opacity: 0.5, margin: 1, cursor: "pointer" }}
                    >
                        <Card src={character.characterClass.cardBackImageUrl} altText="Unselected card" />
                    </Box>
                );
            })}
        </Box>
    );
};

export default Hand;
