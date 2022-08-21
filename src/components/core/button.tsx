import { Button as MuiButton, Typography } from "@mui/material";

interface ButtonProps {
    text: string;
    onClick: () => void;
    startIcon?: JSX.Element;
}

const Button = ({ text, onClick, startIcon }: ButtonProps) => {
    return (
        <MuiButton
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
        </MuiButton>
    );
};

export default Button;
