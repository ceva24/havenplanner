import { Button, Typography } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";

interface CreateLinkButtonProps {
    character: Character;
}

const CreateLinkButton = ({ character }: CreateLinkButtonProps) => {
    const onClick = async () => {
        const response = await fetch("/api/encode-character", {
            method: "POST",
            body: JSON.stringify(character),
            headers: { "Content-Type": "application/json" },
        });

        const data: unknown = await response.json();

        console.log(data);
    };

    return (
        <Button
            variant="contained"
            startIcon={<ShareIcon />}
            sx={{ margin: "1%" }}
            onClick={onClick}
        >
            <Typography variant="body1">Share</Typography>
        </Button>
    );
};

export default CreateLinkButton;
