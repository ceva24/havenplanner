import { Dialog, Box, DialogContent, Stack, Typography, Link } from "@mui/material";
import ProsperitySlider from "@/components/settings/prosperity-slider";
import { Button } from "@/components/core/button";

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
                <Stack spacing={5} marginX={3} textAlign="center">
                    <Box component="section" aria-label="Item Spoilers">
                        <ProsperitySlider />
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
