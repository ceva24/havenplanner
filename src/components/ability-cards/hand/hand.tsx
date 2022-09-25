import { Dispatch, KeyboardEvent, SetStateAction, useState } from "react";
import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Card } from "@/components/core/cards";
import SelectCardDialog from "@/components/ability-cards/hand/select-card-dialog";
import Button from "@/components/core/button";

interface HandProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
    openSelectCardDialog: () => void;
}

const Hand = ({ character, setCharacter, openSelectCardDialog }: HandProps) => {
    return (
        <Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", paddingBottom: 3 }}>
                {character.hand
                    .sort((a: AbilityCard, b: AbilityCard) => a.id - b.id)
                    .map((abilityCard: AbilityCard) => (
                        <Box key={abilityCard.id} sx={{ margin: 1 }}>
                            <Card src={abilityCard.imageUrl} altText={abilityCard.name} />
                        </Box>
                    ))}
            </Box>
            <Box textAlign="center">
                <Button text="Edit hand" onClick={openSelectCardDialog} />
            </Box>
        </Box>
    );
};

export default Hand;
