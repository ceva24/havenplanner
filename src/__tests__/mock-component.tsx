import { Box } from "@mui/material";

interface MockComponentProps {
    name: string;
}

const MockComponent = ({ name }: MockComponentProps) => {
    return <Box role="region" aria-label={name} />;
};

export default MockComponent;
