import { Modal, Paper, Stack, Typography, Box, TextField, IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface ShareLinkModalProps {
    shareableLink: string;
    encodeCharacterError: boolean;
    isOpen: boolean;
    onClose: () => void;
}

const ShareLinkModal = ({ shareableLink, encodeCharacterError, isOpen, onClose }: ShareLinkModalProps) => {
    const value = encodeCharacterError ? "Error" : shareableLink;

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Paper
                component="div"
                sx={{
                    position: "absolute",
                    top: "35%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "30rem",
                    bgcolor: "#0f0302",
                    padding: 3,
                }}
            >
                <Stack spacing={1}>
                    <Typography>Copy the link below to share this character:</Typography>

                    <Box component="form" sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                        <TextField sx={{ flex: 1 }} value={value} placeholder="Loading..." />
                        <IconButton
                            color="primary"
                            sx={{ padding: "1rem", marginLeft: "1rem", color: "#c09172" }}
                            aria-label="directions"
                        >
                            <ContentCopyIcon />
                        </IconButton>
                    </Box>
                </Stack>
            </Paper>
        </Modal>
    );
};

export default ShareLinkModal;
