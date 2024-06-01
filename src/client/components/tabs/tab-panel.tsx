import type { ReactNode } from "react";
import { Box } from "@mui/material";

interface TabPanelProperties {
    readonly children?: ReactNode;
    readonly index: number;
    readonly currentTabIndex: number;
    readonly id: string;
    readonly ariaLabelledBy: string;
}

const TabPanel = ({ children, index, currentTabIndex, id, ariaLabelledBy }: TabPanelProperties) => {
    return (
        <Box role="tabpanel" id={id} aria-labelledby={ariaLabelledBy} hidden={currentTabIndex !== index}>
            {currentTabIndex === index && <Box sx={{ padding: 5 }}>{children}</Box>}
        </Box>
    );
};

export default TabPanel;
