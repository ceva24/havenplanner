import { Button as MuiButton, Typography } from "@mui/material";

interface ButtonProps {
    id?: string;
    text: string;
    onClick: () => void;
    startIcon?: JSX.Element;
}

const Button = ({ id, text, onClick, startIcon }: ButtonProps) => {
    return (
        <MuiButton
            id={id}
            variant="contained"
            sx={{
                margin: "1%",
                paddingLeft: 3,
                paddingRight: 3,
            }}
            startIcon={startIcon}
            onClick={onClick}
        >
            <Typography variant="body1">{text}</Typography>
        </MuiButton>
    );
};

const TextButton = ({ id, text, onClick, startIcon }: ButtonProps) => {
    return (
        <MuiButton
            id={id}
            variant="text"
            color="secondary"
            sx={{
                margin: "1%",
                paddingLeft: 3,
                paddingRight: 3,
            }}
            startIcon={startIcon}
            onClick={onClick}
        >
            <Typography variant="body1">{text}</Typography>
        </MuiButton>
    );
};

export { Button, TextButton };
