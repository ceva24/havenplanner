import { Button as MuiButton, Typography, useTheme } from "@mui/material";

interface ButtonProperties {
    readonly id?: string;
    readonly text: string;
    readonly onClick: () => void;
    readonly startIcon?: JSX.Element;
}

const Button = ({ id, text, onClick, startIcon }: ButtonProperties) => {
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

const TextButton = ({ id, text, onClick, startIcon }: ButtonProperties) => {
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

interface IconButtonProperties {
    readonly id?: string;
    readonly icon: JSX.Element;
    readonly label: string;
    readonly onClick: () => void;
}

const IconButton = ({ id, icon, label, onClick }: IconButtonProperties) => {
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
