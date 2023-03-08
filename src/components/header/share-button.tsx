import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import ShareIcon from "@mui/icons-material/Share";
import ShareDialog from "@/components/header/share-dialog";
import { Button } from "@/components/core/button";
import { useSettingsContext } from "@/hooks/use-settings";
import { encode } from "@/services/share/codec";

interface ShareButtonProps {
    character: Character;
}

const ShareButton = ({ character }: ShareButtonProps) => {
    const [settings] = useSettingsContext();

    const [shareableLink, setShareableLink] = useState<string>("");
    const [shareDialogOpen, setShareDialogOpen] = useState<boolean>(false);
    const [encodeCharacterError, setEncodeCharacterError] = useState<boolean>(false);

    useEffect(() => {
        setShareableLink("");
    }, [character]);

    const handleOpen = () => {
        setShareDialogOpen(true);

        generateAndSetShareableLink(
            character,
            settings.gameData,
            shareableLink,
            setShareableLink,
            setEncodeCharacterError
        );
    };

    const handleClose = () => {
        setShareDialogOpen(false);
        setEncodeCharacterError(false);
    };

    return (
        <>
            <Button id="share-button" text="Share" startIcon={<ShareIcon />} onClick={handleOpen} />
            <ShareDialog
                shareableLink={shareableLink}
                encodeCharacterError={encodeCharacterError}
                isOpen={shareDialogOpen}
                handleClose={handleClose}
            />
        </>
    );
};

const generateAndSetShareableLink = (
    character: Character,
    gameData: GameData,
    shareableLink: string,
    setShareableLink: Dispatch<SetStateAction<string>>,
    setEncodeCharacterError: Dispatch<SetStateAction<boolean>>
    // eslint-disable-next-line max-params
) => {
    if (!shareableLink) {
        try {
            const encodedCharacterData = encode({ character, gameData });

            setShareableLink(`${location.origin}?character=${encodedCharacterData}`);
        } catch {
            setEncodeCharacterError(true);
        }
    }
};

export default ShareButton;
export { generateAndSetShareableLink as retrieveAndSetShareableLink };
