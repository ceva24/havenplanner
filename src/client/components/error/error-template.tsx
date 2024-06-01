import { Container, Grid, Typography, Stack } from "@mui/material";

interface ErrorTemplateProperties {
    readonly message: string;
}

const ErrorTemplate = ({ message }: ErrorTemplateProperties) => {
    return (
        <Container component="main" maxWidth="xl">
            <Grid container height="100%" minHeight="45rem">
                <Grid item xs={12}>
                    <Stack height="100%" textAlign="center" justifyContent="center">
                        <Typography fontSize={40}>{message}</Typography>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ErrorTemplate;
