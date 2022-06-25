import { Button, Typography } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { useState } from "react";
import ShareLinkModal from "./share-link-modal";
import { EncodeCharacterApiResponse } from "@/pages/api/encode-character";

interface CreateLinkButtonProps {
    character: Character;
}

const ShareLinkButton = ({ character }: CreateLinkButtonProps) => {
    const [shareLinkModalOpen, setShareLinkModalOpen] = useState<boolean>(false);
    const [shareableLink, setShareableLink] = useState<string>("");

    const handleOpen = async () => {
        setShareLinkModalOpen(true);

        try {
            const response = await fetch("/api/encode-character", {
                method: "POST",
                body: JSON.stringify(character),
                headers: { "Content-Type": "application/json" },
            });

            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const responseData: EncodeCharacterApiResponse = await response.json();

            setShareableLink(`${location.origin}?character=${responseData.encodedCharacterData}`);
        } catch {
            setShareableLink("Error");
        }
    };

    const handleClose = () => {
        setShareLinkModalOpen(false);
        setShareableLink("");
    };

    return (
        <>
            <Button variant="contained" startIcon={<ShareIcon />} sx={{ margin: "1%" }} onClick={handleOpen}>
                <Typography variant="body1">Share</Typography>
            </Button>
            <ShareLinkModal shareableLink={shareableLink} isOpen={shareLinkModalOpen} onClose={handleClose} />
        </>
    );
};

export default ShareLinkButton;
