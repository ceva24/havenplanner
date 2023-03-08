import { Dialog, Box, DialogContent, Stack, Typography, Link } from "@mui/material";
import { Button } from "@/components/core/button";
import ProsperitySlider from "@/components/settings/prosperity-slider";
import ItemGroups from "@/components/settings/item-groups";
import SpoilAllSwitch from "@/components/settings/spoil-all-switch";

interface SettingsDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const SettingsDialog = ({ isOpen, onClose }: SettingsDialogProps) => {
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
                        <Box component="section" aria-label="Item Spoilers">
                            <ProsperitySlider />
                            <ItemGroups />
                        </Box>
                    </Box>
                    <Link href="https://github.com/ceva24/ghplanner.app/issues" target="_blank">
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
