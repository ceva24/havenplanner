import { Button as MuiButton, Typography } from "@mui/material";
import theme from "@/theme";

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
    icon: JSX.Element;
    label: string;
    onClick: () => void;
}

const IconButton = ({ icon, label, onClick }: IconButtonProps) => {
    return (
        <MuiButton
            aria-label={label}
            variant="contained"
            startIcon={icon}
            sx={{
                "& .MuiButton-startIcon": {
                    marginX: 0,
                },
                "& .MuiButton-startIcon > :nth-of-type(1)": {
                    // @ts-expect-error no issue with call to .spacing
                    fontSize: theme.spacing(3) as number,
                },
            }}
            onClick={onClick}
        />
    );
};

export { Button, TextButton, IconButton };
