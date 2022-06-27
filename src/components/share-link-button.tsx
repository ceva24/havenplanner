import { Button, Typography } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ShareLinkDialog from "./share-link-dialog";
import { EncodeCharacterApiResponse } from "@/pages/api/encode-character";

interface CreateLinkButtonProps {
    character: Character;
}

const ShareLinkButton = ({ character }: CreateLinkButtonProps) => {
    const [shareableLink, setShareableLink] = useState<string>("");
    const [shareLinkDialogOpen, setShareLinkDialogOpen] = useState<boolean>(false);
    const [encodeCharacterError, setEncodeCharacterError] = useState<boolean>(false);

    useEffect(() => {
        setShareableLink("");
    }, [character]);

    const handleOpen = () => {
        setShareLinkDialogOpen(true);

        void retrieveAndSetShareableLink(character, shareableLink, setShareableLink, setEncodeCharacterError);
    };

    const handleClose = () => {
        setShareLinkDialogOpen(false);
        setEncodeCharacterError(false);
    };

    return (
        <>
            <Button
                variant="contained"
                startIcon={<ShareIcon />}
                // eslint-disable-next-line @typescript-eslint/naming-convention
                sx={{ margin: "1%", backgroundColor: "#c09172", "&:hover": { backgroundColor: "#d7baa7" } }}
                onClick={handleOpen}
            >
                <Typography variant="body1">Share</Typography>
            </Button>
            <ShareLinkDialog
                shareableLink={shareableLink}
                encodeCharacterError={encodeCharacterError}
                isOpen={shareLinkDialogOpen}
                onClose={handleClose}
            />
        </>
    );
};

const retrieveAndSetShareableLink = async (
    character: Character,
    shareableLink: string,
    setShareableLink: Dispatch<SetStateAction<string>>,
    setEncodeCharacterError: Dispatch<SetStateAction<boolean>>
) => {
    if (!shareableLink) {
        try {
            const response = await fetch("/api/encode-character", {
                method: "POST",
                body: JSON.stringify(character),
                headers: { "Content-Type": "application/json" },
            });

            if (response.status === 200) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const { encodedCharacterData }: EncodeCharacterApiResponse = await response.json();

                if (encodedCharacterData) {
                    setShareableLink(`${location.origin}?character=${encodedCharacterData}`);
                } else {
                    setEncodeCharacterError(true);
                }
            } else {
                setEncodeCharacterError(true);
            }
        } catch {
            setEncodeCharacterError(true);
        }
    }
};

export default ShareLinkButton;
export { retrieveAndSetShareableLink };
