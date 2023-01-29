import { useState } from "react";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsDrawer from "@/components/settings/settings-drawer";

const SettingsButton = () => {
    const [settingsDrawerIsOpen, setSettingsDrawerIsOpen] = useState<boolean>(false);

    return (
        <Box>
            <IconButton
                id="open-settings-button"
                color="secondary"
                aria-label="Settings"
                onClick={() => {
                    setSettingsDrawerIsOpen(true);
                }}
            >
                <SettingsIcon />
            </IconButton>
            <SettingsDrawer
                isOpen={settingsDrawerIsOpen}
                onClose={() => {
                    setSettingsDrawerIsOpen(false);
                }}
            />
        </Box>
    );
};

export default SettingsButton;
