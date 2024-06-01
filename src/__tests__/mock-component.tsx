import { Box } from "@mui/material";

interface MockComponentProperties {
    readonly name: string;
}

const MockComponent = ({ name }: MockComponentProperties) => {
    return <Box role="region" aria-label={name} />;
};

export default MockComponent;
