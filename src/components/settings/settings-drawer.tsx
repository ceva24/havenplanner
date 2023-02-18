import { Box, Drawer, IconButton, Link, Slider, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ProsperitySlider from "./prosperity-slider";

interface SettingsDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const SettingsDrawer = ({ isOpen, onClose }: SettingsDrawerProps) => {
    return (
        <Drawer anchor="right" open={isOpen} onClose={onClose}>
            <Box
                role="presentation"
                textAlign="center"
                marginTop={2}
                sx={{ width: { xs: "100vw", sm: 400 } }}
                aria-label="Settings"
            >
                <Box width="100%" textAlign="right" paddingLeft={2} paddingRight={2}>
                    <IconButton color="secondary" aria-label="Close" onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Stack spacing={5}>
                    <Box component="section" aria-label="Item Spoilers">
                        <Typography component="h2" variant="h2" marginBottom={3}>
                            Item spoilers
                        </Typography>
                        <ProsperitySlider />
                    </Box>
                    <Link href="https://github.com/ceva24/ghplanner.app/issues" target="_blank">
                        <Typography color="main" variant="body1">
                            Report an issue
                        </Typography>
                    </Link>
                </Stack>
            </Box>
        </Drawer>
    );
};

export default SettingsDrawer;
