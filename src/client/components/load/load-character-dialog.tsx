import { type Dispatch, type SetStateAction, useState } from "react";
import { Box, Dialog, DialogContent, Grid, Stack, Typography } from "@mui/material";
import { useSettingsContext } from "@/client/hooks/use-settings";
import { Button, TextButton } from "@/client/components/core/button";
import { CharacterSpoiler, ItemSpoiler } from "@/client/components/load/spoiler";

interface LoadCharacterDialogProps {
    newSpoilerSettings: SpoilerSettings;
    characterHasSpoilers: boolean;
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const LoadCharacterDialog = ({
    newSpoilerSettings,
    characterHasSpoilers,
    character,
    setCharacter,
}: LoadCharacterDialogProps) => {
    const [loadCharacterDialogOpen, setLoadCharacterDialogOpen] = useState<boolean>(characterHasSpoilers);
    const [settings, setSettings] = useSettingsContext();

    const handleClose = (shouldLoadCharacter: boolean) => {
        if (shouldLoadCharacter) {
            setCharacter(character);

            setSettings({
                ...settings,
                spoilerSettings: newSpoilerSettings,
            });
        }

        setLoadCharacterDialogOpen(false);
    };

    return (
        <Dialog
            open={loadCharacterDialogOpen}
            aria-labelledby="load-character-dialog-title"
            aria-describedby="load-character-dialog-description"
            onClose={() => {
                handleClose(false);
            }}
        >
            <Box id="load-character-dialog-title" style={{ display: "none" }}>
                Load character?
            </Box>
            <DialogContent id="load-character-dialog-description">
                <Stack spacing={3} textAlign="center">
                    <Typography>This character contains the following spoilers:</Typography>
                    <Box>
                        <Grid container spacing={1}>
                            {newSpoilerSettings.classes.map((characterClass: UnlockableCharacterClassSummary) => (
                                <Grid key={characterClass.id} item xs={12}>
                                    <CharacterSpoiler key={characterClass.id} characterClass={characterClass} />
                                </Grid>
                            ))}
                            {newSpoilerSettings.items.prosperity > 1 && (
                                <Grid item xs={12}>
                                    <ItemSpoiler text={`Prosperity ${newSpoilerSettings.items.prosperity}`} />
                                </Grid>
                            )}
                            {newSpoilerSettings.items.itemGroups.map((itemGroup: ItemGroup) => (
                                <Grid key={itemGroup.id} item xs={12}>
                                    <ItemSpoiler key={itemGroup.id} text={itemGroup.name} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                    <Box display="flex" gap={1} justifyContent="right">
                        <TextButton
                            text="Cancel"
                            onClick={() => {
                                handleClose(false);
                            }}
                        />
                        <Button
                            text="Load"
                            onClick={() => {
                                handleClose(true);
                            }}
                        />
                    </Box>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default LoadCharacterDialog;
