import { Box, Dialog, DialogContent, Grid, Stack, TextField, Typography } from "@mui/material";
import CopyLinkButton from "@/client/components/share/copy-link-button";
import { Button } from "@/client/components/core/button";

interface ShareDialogProperties {
    readonly shareableLink: string;
    readonly encodeCharacterError: boolean;
    readonly isOpen: boolean;
    readonly handleClose: () => void;
}

const ShareDialog = ({ shareableLink, encodeCharacterError, isOpen, handleClose }: ShareDialogProperties) => {
    const value = encodeCharacterError ? "Error" : shareableLink;

    return (
        <Dialog open={isOpen} aria-labelledby="share-dialog-title" onClose={handleClose}>
            <Box id="share-dialog-title" style={{ display: "none" }}>
                Share
            </Box>
            <DialogContent>
                <Stack spacing={1}>
                    <Typography textAlign="center">Copy the link below to share this character:</Typography>

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

                <Grid container spacing={10} textAlign="center" sx={{ paddingTop: 2 }}>
                    <Grid item width="100%">
                        <Button text="Close" onClick={handleClose} />
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default ShareDialog;
