import { Button, Typography } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { useEffect, useState } from "react";
import ShareLinkModal from "./share-link-modal";
import { EncodeCharacterApiResponse } from "@/pages/api/encode-character";

interface CreateLinkButtonProps {
    character: Character;
}

const ShareLinkButton = ({ character }: CreateLinkButtonProps) => {
    const [shareableLink, setShareableLink] = useState<string>("");
    const [shareLinkModalOpen, setShareLinkModalOpen] = useState<boolean>(false);
    const [encodeCharacterError, setEncodeCharacterError] = useState<boolean>(false);

    useEffect(() => {
        setShareableLink("");
    }, [character]);

    const handleOpen = async () => {
        setShareLinkModalOpen(true);

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

    const handleClose = () => {
        setShareLinkModalOpen(false);
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
            <ShareLinkModal
                shareableLink={shareableLink}
                encodeCharacterError={encodeCharacterError}
                isOpen={shareLinkModalOpen}
                onClose={handleClose}
            />
        </>
    );
};

export default ShareLinkButton;
