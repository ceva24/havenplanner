import { Button, Typography } from "@mui/material";

interface StyledButtonProps {
    text: string;
    onClick: () => void;
    startIcon?: JSX.Element;
}

const StyledButton = ({ text, onClick, startIcon }: StyledButtonProps) => {
    return (
        <Button
            variant="contained"
            sx={{
                margin: "1%",
                backgroundColor: "secondary.main",
                // eslint-disable-next-line @typescript-eslint/naming-convention
                "&:hover": { backgroundColor: "secondary.light" },
            }}
            startIcon={startIcon}
            onClick={onClick}
        >
            <Typography variant="body1">{text}</Typography>
        </Button>
    );
};

export default StyledButton;
