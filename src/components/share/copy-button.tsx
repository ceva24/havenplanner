import { ClickAwayListener, IconButton, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";

interface CopyButtonProps {
    shareableLink: string;
    encodeCharacterError: boolean;
}

const CopyButton = ({ shareableLink, encodeCharacterError }: CopyButtonProps) => {
    const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);

    const copyLink = async () => {
        await navigator.clipboard.writeText(shareableLink);
        setTooltipOpen(true);
    };

    const handleTooltipClose = () => {
        setTooltipOpen(false);
    };

    return (
        <ClickAwayListener onClickAway={handleTooltipClose}>
            <div>
                <Tooltip
                    disableFocusListener
                    disableTouchListener
                    PopperProps={{
                        disablePortal: true,
                    }}
                    placement="top"
                    open={tooltipOpen}
                    title="Copied to clipboard!"
                    onClose={handleTooltipClose}
                >
                    <IconButton
                        sx={{ padding: "1rem", marginLeft: "1rem", color: "secondary.main" }}
                        disabled={encodeCharacterError || !shareableLink}
                        aria-label="Copy link"
                        onClick={copyLink}
                    >
                        <ContentCopyIcon />
                    </IconButton>
                </Tooltip>
            </div>
        </ClickAwayListener>
    );
};

export default CopyButton;
