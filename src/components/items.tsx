import { Autocomplete, AutocompleteRenderInputParams, Box, FormControl, Grid, TextField } from "@mui/material";
import Item from "@/components/items/item";

const Items = () => {
    return (
        <Grid container spacing={5}>
            <Grid item textAlign="center" width="100%">
                <FormControl sx={{ width: { xs: "100%", sm: "80%", md: "50%", lg: "35%" } }}>
                    <Autocomplete
                        disablePortal
                        blurOnSelect
                        value={null}
                        options={["a", "b", "c"]}
                        renderInput={(props: AutocompleteRenderInputParams) => (
                            <TextField {...props} label="Add item" />
                        )}
                    />
                </FormControl>
            </Grid>
            <Grid item lg={12} textAlign="center">
                <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                </Box>
            </Grid>
        </Grid>
    );
};

export default Items;
