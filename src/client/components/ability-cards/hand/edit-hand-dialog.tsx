import type { Dispatch, SetStateAction } from "react";
import { Box } from "@mui/material";
import ToggleableAbilityCard from "@/client/components/ability-cards/toggleable-ability-card";
import DisabledAbilityCard from "@/client/components/ability-cards/disabled-ability-card";
import FullScreenDialog from "@/client/components/core/full-screen-dialog";
import {
    getAllAvailableAbilityCardsForCharacter,
    isCardInHandForCharacter,
    wouldBeExceedingHandSizeLimit,
} from "@/client/services/ability-cards/hand";

interface EditHandDialogProperties {
    readonly character: Character;
    readonly setCharacter: Dispatch<SetStateAction<Character>>;
    readonly isOpen: boolean;
    readonly handleClose: () => void;
}

const EditHandDialog = ({ character, setCharacter, isOpen, handleClose }: EditHandDialogProperties) => {
    return (
        <FullScreenDialog
            title="Select ability cards"
            subtitle={`${character.hand.length} / ${character.characterClass.handSize}`}
            isOpen={isOpen}
            handleClose={handleClose}
        >
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
        </FullScreenDialog>
    );
};

const toggleCardAddedToHand = (
    character: Character,
    setCharacter: Dispatch<SetStateAction<Character>>,
    abilityCard: AbilityCard,
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

export default EditHandDialog;
export { toggleCardAddedToHand };
