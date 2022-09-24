import { Box, Typography, Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import { getAllAvailableAbilityCardsForCharacter } from "@/services/character";
import { Card } from "@/components/core/cards";
import Button from "@/components/core/button";

interface SelectCardDialogProps {
    character: Character;
    isOpen: boolean;
    handleClose: () => void;
}

const SelectCardDialog = ({ character, isOpen, handleClose }: SelectCardDialogProps) => {
    return (
        <Dialog fullScreen open={isOpen} aria-labelledby="select-card-dialog-title" onClose={handleClose}>
            <DialogTitle id="select-card-dialog-title" sx={{ backgroundColor: "background.default" }}>
                <Typography color="textPrimary" textAlign="center" variant="h2">
                    Select ability card
                </Typography>
            </DialogTitle>
            <DialogContent sx={{ backgroundColor: "background.default" }}>
                <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                    {getAllAvailableAbilityCardsForCharacter(character).map((abilityCard: AbilityCard) => (
                        <Box
                            key={abilityCard.id}
                            role="button"
                            tabIndex={0}
                            sx={{ margin: 1, cursor: "pointer", position: "relative" }}
                        >
                            <Card src={abilityCard.imageUrl} altText={abilityCard.name} />
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
