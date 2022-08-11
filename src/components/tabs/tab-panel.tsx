import { Box } from "@mui/material";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    currentTabIndex: number;
    id: string;
    ariaLabelledBy: string;
}

const TabPanel = ({ children, index, currentTabIndex, id, ariaLabelledBy }: TabPanelProps) => {
    return (
        <div role="tabpanel" id={id} aria-labelledby={ariaLabelledBy} hidden={currentTabIndex !== index}>
            {currentTabIndex === index && <Box sx={{ padding: 5 }}>{children}</Box>}
        </div>
    );
};

export default TabPanel;
