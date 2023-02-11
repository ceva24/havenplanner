import type { ReactNode } from "react";
import { Dialog, AppBar, Toolbar, Typography, DialogContent, Box } from "@mui/material";
import { Button } from "@/components/core/button";

interface FullScreenDialogProps {
    title: string;
    subtitle?: string;
    isOpen: boolean;
    handleClose: () => void;
    children: ReactNode;
}

const FullScreenDialog = ({ title, subtitle, isOpen, handleClose, children }: FullScreenDialogProps) => {
    return (
        <Dialog fullScreen open={isOpen} aria-labelledby="dialog-title" onClose={handleClose}>
            <AppBar sx={{ position: "relative", paddingBottom: 2, textAlign: "center" }}>
                <Toolbar>
                    <Typography id="dialog-title" variant="h2" sx={{ marginLeft: 2, flex: 1 }}>
                        {title}
                    </Typography>
                    <Box sx={{ position: "absolute", right: 0, marginTop: 1, marginRight: 3 }}>
                        <Button text="Close" onClick={handleClose} />
                    </Box>
                </Toolbar>
                {subtitle && (
                    <Typography variant="h2" component="p">
                        {subtitle}
                    </Typography>
                )}
            </AppBar>
            <DialogContent sx={{ backgroundColor: "background.default" }}>
                <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>{children}</Box>
            </DialogContent>
        </Dialog>
    );
};

export default FullScreenDialog;
