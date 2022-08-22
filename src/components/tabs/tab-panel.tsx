import { ReactNode } from "react";
import { Box } from "@mui/material";

interface TabPanelProps {
    children?: ReactNode;
    index: number;
    currentTabIndex: number;
    id: string;
    ariaLabelledBy: string;
}

const TabPanel = ({ children, index, currentTabIndex, id, ariaLabelledBy }: TabPanelProps) => {
    return (
        <Box role="tabpanel" id={id} aria-labelledby={ariaLabelledBy} hidden={currentTabIndex !== index}>
            {currentTabIndex === index && <Box sx={{ padding: 5 }}>{children}</Box>}
        </Box>
    );
};

export default TabPanel;
