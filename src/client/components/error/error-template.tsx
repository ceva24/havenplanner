import { Container, Grid, Typography, Stack } from "@mui/material";

interface ErrorTemplateProps {
    message: string;
}

const ErrorTemplate = ({ message }: ErrorTemplateProps) => {
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
