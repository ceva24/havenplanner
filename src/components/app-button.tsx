import { Button, Typography } from "@mui/material";

interface AppButtonProps {
    text: string;
    onClick: () => void;
    startIcon?: JSX.Element;
}

const AppButton = ({ text, onClick, startIcon }: AppButtonProps) => {
    return (
        <Button
            variant="contained"
            sx={{
                margin: "1%",
                paddingLeft: 3,
                paddingRight: 3,
                color: "background.default",
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

export default AppButton;
