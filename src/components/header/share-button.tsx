import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ShareIcon from "@mui/icons-material/Share";
import ShareDialog from "@/components/header/share-dialog";
import AppButton from "@/components/app-button";
import { encode } from "@/services/encoder";

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

        generateAndSetShareableLink(character, shareableLink, setShareableLink, setEncodeCharacterError);
    };

    const handleClose = () => {
        setShareDialogOpen(false);
        setEncodeCharacterError(false);
    };

    return (
        <>
            <AppButton text="Share" startIcon={<ShareIcon />} onClick={handleOpen} />
            <ShareDialog
                shareableLink={shareableLink}
                encodeCharacterError={encodeCharacterError}
                isOpen={shareDialogOpen}
                onClose={handleClose}
            />
        </>
    );
};

const generateAndSetShareableLink = (
    character: Character,
    shareableLink: string,
    setShareableLink: Dispatch<SetStateAction<string>>,
    setEncodeCharacterError: Dispatch<SetStateAction<boolean>>
) => {
    if (!shareableLink) {
        try {
            const encodedCharacterData = encode(character);

            setShareableLink(`${location.origin}?character=${encodedCharacterData}`);
        } catch {
            setEncodeCharacterError(true);
        }
    }
};

export default ShareButton;
export { generateAndSetShareableLink as retrieveAndSetShareableLink };
