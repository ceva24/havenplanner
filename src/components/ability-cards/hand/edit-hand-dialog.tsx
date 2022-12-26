import { Box, Dialog, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import type { Dispatch, SetStateAction } from "react";
import { getAllAvailableAbilityCardsForCharacter, isCardInHandForCharacter } from "@/services/character";
import Button from "@/components/core/button";
import ActiveAbilityCard from "@/components/ability-cards/toggleable-ability-card";
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
            <DialogTitle
                id="edit-hand-dialog-title"
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
                                isCardInHandForCharacter(character, abilityCard) ? (
                                    <ActiveAbilityCard
                                        abilityCard={abilityCard}
                                        action={() => {
                                            toggleCardAddedToHand(character, setCharacter, abilityCard);
                                        }}
                                        isSelected={isCardInHandForCharacter(character, abilityCard)}
                                        showLockIcon={false}
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
