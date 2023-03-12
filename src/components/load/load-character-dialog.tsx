import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { Box, Dialog, DialogContent, Stack, Typography } from "@mui/material";
import { useSettingsContext } from "@/hooks/use-settings";
import { useClearQueryString } from "@/hooks/use-clear-query-string";
import { Button, TextButton } from "@/components/core/button";
import { CharacterSpoiler, ItemSpoiler } from "@/components/load/spoiler";
import { hasCharacterSpoilers, hasItemSpoilers } from "@/services/spoiler";

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
    const clearQueryString = useClearQueryString();

    useEffect(() => {
        if (!characterHasSpoilers) clearQueryString();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleClose = (shouldLoadCharacter: boolean) => {
        if (shouldLoadCharacter) {
            setCharacter(character);

            setSettings({
                ...settings,
                spoilerSettings: newSpoilerSettings,
            });

            clearQueryString();
        }

        setLoadCharacterDialogOpen(false);
    };

    return (
        <Dialog
            open={loadCharacterDialogOpen}
            aria-labelledby="load-character-dialog-title"
            aria-describedby="load-character-dialog-description"
        >
            <Box id="load-character-dialog-title" style={{ display: "none" }}>
                Load character?
            </Box>
            <DialogContent id="load-character-dialog-description">
                <Stack spacing={3}>
                    <Typography>This character contains the following spoilers:</Typography>
                    {hasCharacterSpoilers(newSpoilerSettings) && (
                        <Stack spacing={1}>
                            {newSpoilerSettings.classes.map((characterClass: UnlockableCharacterClassSummary) => (
                                <CharacterSpoiler key={characterClass.id} characterClass={characterClass} />
                            ))}
                        </Stack>
                    )}
                    {hasItemSpoilers(newSpoilerSettings) && (
                        <Stack spacing={1}>
                            {newSpoilerSettings.items.prosperity > 1 && (
                                <ItemSpoiler text={`Prosperity ${newSpoilerSettings.items.prosperity}`} />
                            )}
                            {newSpoilerSettings.items.itemGroups.map((itemGroup: ItemGroup) => (
                                <ItemSpoiler key={itemGroup.id} text={itemGroup.name} />
                            ))}
                        </Stack>
                    )}
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
