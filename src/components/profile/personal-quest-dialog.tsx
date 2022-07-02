import { Dialog, DialogContent, DialogContentText, Grid } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import PersonalQuestAutocomplete from "@/components/profile/personal-quest-autocomplete";
import Card from "@/components/card";

interface PersonalQuestDialogProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
    isOpen: boolean;
    onClose: () => void;
}

const PersonalQuestDialog = ({ character, setCharacter, isOpen, onClose }: PersonalQuestDialogProps) => {
    const personalQuestImage =
        character.personalQuest?.imageUrl ?? "/worldhaven/images/personal-quests/gloomhaven/gh-pq-back.png";

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
                        <Grid item lg={12} sx={{ width: "100%" }}>
                            <PersonalQuestAutocomplete character={character} setCharacter={setCharacter} />
                        </Grid>

                        <Grid item lg={12} width="100%" textAlign="center">
                            <Card url={personalQuestImage} altText="Selected personal quest" />
                        </Grid>
                    </Grid>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
};

export default PersonalQuestDialog;
