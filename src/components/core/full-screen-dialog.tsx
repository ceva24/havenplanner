import type { ReactNode } from "react";
import { Dialog, AppBar, Toolbar, Typography, DialogContent, Box, useMediaQuery, useTheme } from "@mui/material";
import { Button } from "@/components/core/button";

interface FullScreenDialogProps {
    title: string;
    subtitle?: string;
    isOpen: boolean;
    handleClose: () => void;
    children: ReactNode;
}

const FullScreenDialog = ({ title, subtitle, isOpen, handleClose, children }: FullScreenDialogProps) => {
    const theme = useTheme();

    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <Dialog fullScreen open={isOpen} aria-labelledby="dialog-title" onClose={handleClose}>
            <AppBar sx={{ position: "relative", paddingY: { xs: 1, md: 0 } }}>
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }} textAlign="center">
                        <Typography id="dialog-title" variant="h2" component="span">
                            {title}
                        </Typography>
                        {subtitle && !isSmallScreen && (
                            <Typography variant="h2" component="span">
                                {" "}
                                - {subtitle}
                            </Typography>
                        )}
                    </Box>
                    <Box>
                        <Button text="Close" onClick={handleClose} />
                    </Box>
                </Toolbar>
                {subtitle && isSmallScreen && (
                    <Typography variant="h2" component="p" textAlign="center">
                        {subtitle}
                    </Typography>
                )}
            </AppBar>
            <DialogContent sx={{ backgroundColor: "background.default" }}>{children}</DialogContent>
        </Dialog>
    );
};

export default FullScreenDialog;
