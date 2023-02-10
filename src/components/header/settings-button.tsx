import { useState } from "react";
import Box from "@mui/material/Box";
import SettingsIcon from "@mui/icons-material/Settings";
import { TextButton } from "@/components/core/button";
import SettingsDrawer from "@/components/settings/settings-drawer";

const SettingsButton = () => {
    const [settingsDrawerIsOpen, setSettingsDrawerIsOpen] = useState<boolean>(false);

    return (
        <Box>
            <TextButton
                text="Settings"
                startIcon={<SettingsIcon />}
                onClick={() => {
                    setSettingsDrawerIsOpen(true);
                }}
            />
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
