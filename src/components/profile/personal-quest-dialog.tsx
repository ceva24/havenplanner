import { Dialog, DialogContent, Grid } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import PersonalQuestAutocomplete from "@/components/profile/personal-quest-autocomplete";
import { Card } from "@/components/cards";
import AppButton from "@/components/app-button";
import { defaultPersonalQuestCardImageUrl } from "@/utils/constants";

interface PersonalQuestDialogProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
    isOpen: boolean;
    onClose: () => void;
}

const PersonalQuestDialog = ({ character, setCharacter, isOpen, onClose }: PersonalQuestDialogProps) => {
    const personalQuestImageUrl = character.personalQuest?.imageUrl ?? defaultPersonalQuestCardImageUrl;

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
                <Grid container spacing={5}>
                    <Grid item lg={12} width="100%">
                        <PersonalQuestAutocomplete character={character} setCharacter={setCharacter} />
                    </Grid>

                    <Grid item lg={12} width="100%" textAlign="center">
                        <Card src={personalQuestImageUrl} altText="Personal quest" />
                    </Grid>
                    <Grid item lg={12} width="100%" textAlign="center">
                        <AppButton text="Close" onClick={onClose} />
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default PersonalQuestDialog;
