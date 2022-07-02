import { Dialog, DialogContent, DialogContentText, Grid } from "@mui/material";
import PersonalQuestSelect from "@/components/profile/personal-quest-select";
import Card from "@/components/card";

interface PersonalQuestDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const PersonalQuestDialog = ({ isOpen, onClose }: PersonalQuestDialogProps) => {
    return (
        <Dialog open={isOpen} sx={{ bottom: 300 }} aria-labelledby="personal-quest-dialog-title" onClose={onClose}>
            <span id="personal-quest-dialog-title" style={{ display: "none" }}>
                Personal quest
            </span>

            <DialogContent sx={{ backgroundColor: "background.default" }}>
                <DialogContentText>
                    <Grid container spacing={5}>
                        <Grid item lg={12} sx={{ width: "100%" }}>
                            <PersonalQuestSelect />
                        </Grid>

                        <Grid item lg={12} width="100%" textAlign="center">
                            <Card
                                url="/worldhaven/images/personal-quests/gloomhaven/gh-pq-back.png"
                                altText="Selected personal quest"
                            />
                        </Grid>
                    </Grid>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
};

export default PersonalQuestDialog;
