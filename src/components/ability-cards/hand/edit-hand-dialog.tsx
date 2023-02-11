import type { Dispatch, SetStateAction } from "react";
import { AppBar, Box, Dialog, DialogContent, Stack, Toolbar, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getAllAvailableAbilityCardsForCharacter, isCardInHandForCharacter } from "@/services/character";
import ToggleableAbilityCard from "@/components/ability-cards/toggleable-ability-card";
import DisabledAbilityCard from "@/components/ability-cards/disabled-ability-card";

interface EditHandDialogProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
    isOpen: boolean;
    handleClose: () => void;
}

const EditHandDialog = ({ character, setCharacter, isOpen, handleClose }: EditHandDialogProps) => {
    return (
        <Dialog fullScreen open={isOpen} aria-labelledby="edit-hand-dialog-title" onClose={handleClose}>
            <AppBar sx={{ position: "relative", paddingBottom: 2, textAlign: "center" }}>
                <Toolbar>
                    <Typography id="edit-hand-dialog-title" variant="h2" sx={{ marginLeft: 2, flex: 1 }}>
                        Select ability cards
                    </Typography>
                    <IconButton aria-label="Close" onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
                <Typography variant="h2" component="p">
                    {character.hand.length} / {character.characterClass.handSize}
                </Typography>
            </AppBar>
            <DialogContent sx={{ backgroundColor: "background.default" }}>
                <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                    {getAllAvailableAbilityCardsForCharacter(character).map((abilityCard: AbilityCard) => (
                        <Box key={abilityCard.id} sx={{ margin: 1 }}>
                            {character.hand.length < character.characterClass.handSize ||
                            isCardInHandForCharacter(character, abilityCard) ? (
                                <ToggleableAbilityCard
                                    abilityCard={abilityCard}
                                    character={character}
                                    action={() => {
                                        toggleCardAddedToHand(character, setCharacter, abilityCard);
                                    }}
                                    isSelected={isCardInHandForCharacter(character, abilityCard)}
                                    showLockIcon={false}
                                />
                            ) : (
                                <DisabledAbilityCard
                                    abilityCard={abilityCard}
                                    character={character}
                                    tooltipText="Hand is full"
                                />
                            )}
                        </Box>
                    ))}
                </Box>
            </DialogContent>
        </Dialog>
    );
};

const toggleCardAddedToHand = (
    character: Character,
    setCharacter: Dispatch<SetStateAction<Character>>,
    abilityCard: AbilityCard
) => {
    if (wouldBeExceedingHandSizeLimit(character, abilityCard)) return;

    const newHand = isCardInHandForCharacter(character, abilityCard)
        ? character.hand.filter((card: AbilityCard) => card.id !== abilityCard.id)
        : character.hand.concat([abilityCard]);

    setCharacter({
        ...character,
        hand: newHand,
    });
};

const wouldBeExceedingHandSizeLimit = (character: Character, abilityCard: AbilityCard) => {
    return (
        !isCardInHandForCharacter(character, abilityCard) && character.hand.length === character.characterClass.handSize
    );
};

export default EditHandDialog;
export { toggleCardAddedToHand };
