import {
    Stack,
    Typography,
    Box,
    TextField,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import CopyLinkButton from "./copy-link-button";

interface ShareLinkDialogProps {
    shareableLink: string;
    encodeCharacterError: boolean;
    isOpen: boolean;
    onClose: () => void;
}

const ShareLinkDialog = ({ shareableLink, encodeCharacterError, isOpen, onClose }: ShareLinkDialogProps) => {
    const value = encodeCharacterError ? "Error" : shareableLink;

    return (
        <Dialog open={isOpen} sx={{ bottom: 300 }} aria-labelledby="share-link-dialog-title" onClose={onClose}>
            <span id="share-link-dialog-title" style={{ display: "none" }}>
                Share link
            </span>
            <DialogContent sx={{ backgroundColor: "#0f0302" }}>
                <DialogContentText>
                    <Stack spacing={1}>
                        <Typography>Copy the link below to share this character:</Typography>

                        <Box component="form" sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                            <TextField
                                hiddenLabel
                                sx={{ flex: 1 }}
                                value={value}
                                placeholder="Loading..."
                                inputProps={{ "aria-label": "Link" }}
                            />
                            <CopyLinkButton shareableLink={shareableLink} encodeCharacterError={encodeCharacterError} />
                        </Box>
                    </Stack>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
};

export default ShareLinkDialog;
