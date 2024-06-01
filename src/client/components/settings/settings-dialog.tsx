import { Dialog, Box, DialogContent, Stack, Typography, Link } from "@mui/material";
import { Button } from "@/client/components/core/button";
import CharacterClasses from "@/client/components/settings/character-classes";
import ProsperitySlider from "@/client/components/settings/prosperity-slider";
import ItemGroups from "@/client/components/settings/item-groups";
import SpoilAllSwitch from "@/client/components/settings/spoil-all-switch";

interface SettingsDialogProperties {
    readonly isOpen: boolean;
    readonly onClose: () => void;
}

const SettingsDialog = ({ isOpen, onClose }: SettingsDialogProperties) => {
    return (
        <Dialog open={isOpen} aria-labelledby="settings-dialog-title" onClose={onClose}>
            <Box id="settings-dialog-title" style={{ display: "none" }}>
                Settings
            </Box>
            <DialogContent>
                <Stack spacing={5} textAlign="center">
                    <Box>
                        <SpoilAllSwitch />
                    </Box>
                    <Box>
                        <Box component="section" aria-label="Class Spoilers">
                            <CharacterClasses />
                        </Box>
                    </Box>
                    <Box>
                        <Box component="section" aria-label="Item Spoilers">
                            <ProsperitySlider />
                            <ItemGroups />
                        </Box>
                    </Box>
                    <Link href="https://github.com/ceva24/havenplanner/issues" target="_blank">
                        <Typography variant="body1">Report an issue</Typography>
                    </Link>
                    <Box>
                        <Button text="Close" onClick={onClose} />
                    </Box>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default SettingsDialog;
