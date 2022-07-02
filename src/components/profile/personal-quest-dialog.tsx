import { Dialog, DialogContent, DialogContentText, Grid } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import PersonalQuestAutocomplete from "@/components/profile/personal-quest-autocomplete";
import Card from "@/components/card";
import StyledButton from "@/components/styled-button";
import { defaultPersonalQuestCardImage } from "@/utils/constants";

interface PersonalQuestDialogProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
    isOpen: boolean;
    onClose: () => void;
}

const PersonalQuestDialog = ({ character, setCharacter, isOpen, onClose }: PersonalQuestDialogProps) => {
    const personalQuestImage = character.personalQuest?.imageUrl ?? defaultPersonalQuestCardImage;

    return (
        <Dialog
            open={isOpen}
            sx={{ bottom: 300, minHeight: "40rem" }}
            aria-labelledby="personal-quest-dialog-title"
            onClose={onClose}
        >
            <span id="personal-quest-dialog-title" style={{ display: "none" }}>
                Personal quest
            </span>

            <DialogContent sx={{ backgroundColor: "background.default" }}>
                <DialogContentText>
                    <Grid container spacing={5}>
                        <Grid item lg={12} width="100%">
                            <PersonalQuestAutocomplete character={character} setCharacter={setCharacter} />
                        </Grid>

                        <Grid item lg={12} width="100%" textAlign="center">
                            <Card url={personalQuestImage} altText="Personal quest card" />
                        </Grid>
                        <Grid item lg={12} width="100%" textAlign="center">
                            <StyledButton text="Close" onClick={onClose} />
                        </Grid>
                    </Grid>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
};

export default PersonalQuestDialog;
