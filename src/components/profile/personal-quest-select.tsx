import { FormControl, InputLabel, Select } from "@mui/material";

const PersonalQuestSelect = () => {
    return (
        <FormControl sx={{ width: "100%" }}>
            <InputLabel id="select-personal-quest-label">Personal quest</InputLabel>
            <Select label="Personal quest" labelId="select-personal-quest-label" />
        </FormControl>
    );
};

export default PersonalQuestSelect;
