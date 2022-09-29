import { Box, Dialog, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { getAllAvailableAbilityCardsForCharacter } from "@/services/character";
import Button from "@/components/core/button";
import AvailableAbilityCard from "@/components/ability-cards/hand/available-ability-card";
import DisabledAbilityCard from "@/components/ability-cards/disabled-ability-card";

interface SelectCardDialogProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
    isOpen: boolean;
    handleClose: () => void;
}

const SelectCardDialog = ({ character, setCharacter, isOpen, handleClose }: SelectCardDialogProps) => {
    return (
        <Dialog fullScreen open={isOpen} aria-labelledby="select-card-dialog-title" onClose={handleClose}>
            <DialogTitle
                id="select-card-dialog-title"
                color="textPrimary"
                variant="h2"
                textAlign="center"
                sx={{ backgroundColor: "background.default" }}
            >
                Select ability cards
            </DialogTitle>
            <DialogContent sx={{ backgroundColor: "background.default" }}>
                <Stack spacing={3}>
                    <Box textAlign="center">
                        <Typography variant="h1" component="p">
                            {character.hand.length} / {character.characterClass.handSize}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                        {getAllAvailableAbilityCardsForCharacter(character).map((abilityCard: AbilityCard) => (
                            <Box key={abilityCard.id} sx={{ margin: 1 }}>
                                {character.hand.length < character.characterClass.handSize ||
                                character.hand.includes(abilityCard) ? (
                                    <AvailableAbilityCard
                                        abilityCard={abilityCard}
                                        character={character}
                                        setCharacter={setCharacter}
                                    />
                                ) : (
                                    <DisabledAbilityCard abilityCard={abilityCard} tooltipText="Hand is full" />
                                )}
                            </Box>
                        ))}
                    </Box>
                    <Box textAlign="center">
                        <Button text="Close" onClick={handleClose} />
                    </Box>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default SelectCardDialog;
