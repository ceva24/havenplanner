import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { Box, Dialog, DialogContent, Stack, Typography } from "@mui/material";
import { useAppSettingsContext } from "@/hooks/use-app-settings";
import { useClearQueryString } from "@/hooks/use-clear-query-string";
import { Button, TextButton } from "@/components/core/button";
import { ItemSpoiler } from "@/components/spoiler/spoiler";

interface ShareDialogProps {
    spoilerSettings: SpoilerSettings;
    characterHasSpoilers: boolean;
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const LoadCharacterDialog = ({ spoilerSettings, characterHasSpoilers, character, setCharacter }: ShareDialogProps) => {
    const [loadCharacterDialogOpen, setLoadCharacterDialogOpen] = useState<boolean>(characterHasSpoilers);
    const [appSettings, setAppSettings] = useAppSettingsContext();
    const clearQueryString = useClearQueryString();

    useEffect(() => {
        if (!characterHasSpoilers) clearQueryString();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleClose = (shouldLoadCharacter: boolean) => {
        if (shouldLoadCharacter) {
            setCharacter(character);

            setAppSettings({
                ...appSettings,
                spoilerSettings,
            });

            clearQueryString();
        }

        setLoadCharacterDialogOpen(false);
    };

    return (
        <Dialog
            open={loadCharacterDialogOpen}
            sx={{ bottom: 300 }}
            aria-labelledby="load-character-dialog-title"
            aria-describedby="load-character-dialog-description"
        >
            <Box id="load-character-dialog-title" style={{ display: "none" }}>
                Load character?
            </Box>
            <DialogContent id="load-character-dialog-description">
                <Stack spacing={3}>
                    <Typography textAlign="center">This character contains the following spoilers:</Typography>
                    <Stack spacing={1} paddingLeft={3}>
                        {spoilerSettings.prosperity > 1 && (
                            <ItemSpoiler text={`Prosperity ${spoilerSettings.prosperity}`} />
                        )}
                    </Stack>
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
