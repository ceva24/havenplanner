import { type AutocompleteRenderInputParams, TextField } from "@mui/material";
import Image from "@/components/core/image";
import { enhancements } from "@/loaders/enhancements";

interface EnhancementsAutocompleteInputProps extends AutocompleteRenderInputParams {
    enhancementSlot: EnhancementSlot;
}

const EnhancementsAutocompleteInput = ({ enhancementSlot, ...props }: EnhancementsAutocompleteInputProps) => {
    const enhancement = enhancements.find((enhancement: Enhancement) => enhancement.name === props.inputProps.value);

    if (enhancement) {
        props.InputProps.startAdornment = (
            <Image
                webpPath={enhancement.imageUrl}
                fallbackImageType="png"
                altText={enhancement.name}
                style={{ verticalAlign: "middle" }}
                height={30}
                width={30}
                aria-hidden="true"
            />
        );
    }

    return <TextField label={enhancementSlot.name} {...props} />;
};

export default EnhancementsAutocompleteInput;
