import { Box, Drawer, IconButton, Link, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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
                <Link href="https://github.com/ceva24/ghplanner.app/issues" target="_blank">
                    <Typography color="main" variant="body1">
                        Report an issue
                    </Typography>
                </Link>
            </Box>
        </Drawer>
    );
};

export default SettingsDrawer;
