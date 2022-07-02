import {
    Stack,
    Typography,
    Box,
    TextField,
    Dialog,
    DialogContent,
    DialogContentText,
    Button,
    Grid,
} from "@mui/material";
import CopyButton from "@/components/share/copy-button";

interface ShareDialogProps {
    shareableLink: string;
    encodeCharacterError: boolean;
    isOpen: boolean;
    onClose: () => void;
}

const ShareDialog = ({ shareableLink, encodeCharacterError, isOpen, onClose }: ShareDialogProps) => {
    const value = encodeCharacterError ? "Error" : shareableLink;

    return (
        <Dialog open={isOpen} sx={{ bottom: 300 }} aria-labelledby="share-dialog-title" onClose={onClose}>
            <span id="share-dialog-title" style={{ display: "none" }}>
                Share
            </span>
            <DialogContent sx={{ backgroundColor: "background.default" }}>
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
                            <CopyButton shareableLink={shareableLink} encodeCharacterError={encodeCharacterError} />
                        </Box>
                    </Stack>

                    <Grid container spacing={10} textAlign="center" sx={{ paddingTop: 2 }}>
                        <Grid item width="100%">
                            <Button
                                variant="contained"
                                sx={{
                                    margin: "1%",
                                    backgroundColor: "secondary.main",
                                    // eslint-disable-next-line @typescript-eslint/naming-convention
                                    "&:hover": { backgroundColor: "secondary.light" },
                                }}
                                onClick={onClose}
                            >
                                <Typography variant="body1">Close</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
};

export default ShareDialog;
