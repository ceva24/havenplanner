import { Button as MuiButton, Typography, useTheme } from "@mui/material";

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

interface IconButtonProps {
    id?: string;
    icon: JSX.Element;
    label: string;
    onClick: () => void;
}

const IconButton = ({ id, icon, label, onClick }: IconButtonProps) => {
    const theme = useTheme();

    return (
        <MuiButton
            id={id}
            aria-label={label}
            variant="contained"
            startIcon={icon}
            sx={{
                "& .MuiButton-startIcon": {
                    marginX: 0,
                },
                "& .MuiButton-startIcon > :nth-of-type(1)": {
                    fontSize: theme.spacing(3),
                },
            }}
            onClick={onClick}
        />
    );
};

export { Button, TextButton, IconButton };
