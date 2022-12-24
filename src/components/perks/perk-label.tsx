import { FormLabel } from "@mui/material";
import RichPerkDescription from "./rich-perk-description";

interface PerkLabelProps {
    perk: Perk;
    labelId: string;
}

const PerkLabel = ({ perk, labelId }: PerkLabelProps) => {
    return (
        <FormLabel id={labelId} sx={{ cursor: "pointer" }} aria-label={perk.description}>
            <RichPerkDescription perk={perk} />
        </FormLabel>
    );
};

export default PerkLabel;
