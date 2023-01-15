import { type AutocompleteRenderInputParams, TextField } from "@mui/material";
import Image from "@/components/core/image";
import { enhancements } from "@/loaders/enhancements";

interface EnhancementsAutocompleteInputProps extends AutocompleteRenderInputParams {
    slotType: string;
}

const EnhancementsAutocompleteInput = ({ slotType, ...props }: EnhancementsAutocompleteInputProps) => {
    const enhancement = enhancements.find((enhancement: Enhancement) => enhancement.name === props.inputProps.value);

    if (enhancement) {
        props.InputProps.startAdornment = (
            <Image
                webpPath={enhancement.imageUrl}
                fallbackImageType="png"
                altText={enhancement.name}
                style={{ verticalAlign: "middle" }}
                aria-hidden="true"
            />
        );
    }

    return <TextField label={slotType} {...props} />;
};

export default EnhancementsAutocompleteInput;
