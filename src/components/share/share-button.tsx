import { Button, Typography } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ShareDialog from "./share-dialog";
import { EncodeCharacterApiResponse } from "@/pages/api/encode-character";

interface ShareButtonProps {
    character: Character;
}

const ShareButton = ({ character }: ShareButtonProps) => {
    const [shareableLink, setShareableLink] = useState<string>("");
    const [shareDialogOpen, setShareDialogOpen] = useState<boolean>(false);
    const [encodeCharacterError, setEncodeCharacterError] = useState<boolean>(false);

    useEffect(() => {
        setShareableLink("");
    }, [character]);

    const handleOpen = () => {
        setShareDialogOpen(true);

        void retrieveAndSetShareableLink(character, shareableLink, setShareableLink, setEncodeCharacterError);
    };

    const handleClose = () => {
        setShareDialogOpen(false);
        setEncodeCharacterError(false);
    };

    return (
        <>
            <Button
                variant="contained"
                startIcon={<ShareIcon />}
                sx={{
                    margin: "1%",
                    backgroundColor: "secondary.main",
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    "&:hover": { backgroundColor: "secondary.light" },
                }}
                onClick={handleOpen}
            >
                <Typography variant="body1">Share</Typography>
            </Button>
            <ShareDialog
                shareableLink={shareableLink}
                encodeCharacterError={encodeCharacterError}
                isOpen={shareDialogOpen}
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

export default ShareButton;
export { retrieveAndSetShareableLink };
