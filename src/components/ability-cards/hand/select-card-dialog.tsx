import { Box, Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { getAllAvailableAbilityCardsForCharacter } from "@/services/character";
import Button from "@/components/core/button";
import AvailableAbilityCard from "@/components/ability-cards/hand/available-ability-card";

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
                Select ability card
            </DialogTitle>
            <DialogContent sx={{ backgroundColor: "background.default" }}>
                <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                    {getAllAvailableAbilityCardsForCharacter(character).map((abilityCard: AbilityCard) => (
                        <Box key={abilityCard.id} sx={{ margin: 1 }}>
                            <AvailableAbilityCard
                                abilityCard={abilityCard}
                                character={character}
                                setCharacter={setCharacter}
                                handleClose={handleClose}
                            />
                        </Box>
                    ))}
                </Box>
                <Grid container spacing={10} textAlign="center">
                    <Grid item width="100%">
                        <Button text="Close" onClick={handleClose} />
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default SelectCardDialog;
