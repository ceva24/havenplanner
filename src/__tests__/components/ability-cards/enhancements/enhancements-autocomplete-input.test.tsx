import { render, screen } from "@testing-library/react";
import EnhancementsAutocompleteInput from "@/components/ability-cards/enhancements/enhancements-autocomplete-input";

const enhancementSlot: EnhancementSlot = {
    id: 0,
    name: "Attack",
    types: ["numeric", "main-line-targets-enemies"],
};

describe("enhancements autocomplete input", () => {
    it("renders", () => {
        render(
            <EnhancementsAutocompleteInput
                fullWidth
                enhancementSlot={enhancementSlot}
                id="1"
                disabled={false}
                size="small"
                InputLabelProps={{}}
                InputProps={{ className: "", startAdornment: null, endAdornment: null, ref: null }}
                inputProps={{}}
            />
        );

        const input = screen.queryByRole("textbox");

        expect(input).toBeInTheDocument();
    });

    it("renders the enhancement icon when a value is set", () => {
        render(
            <EnhancementsAutocompleteInput
                fullWidth
                enhancementSlot={enhancementSlot}
                id="1"
                disabled={false}
                size="small"
                InputLabelProps={{}}
                InputProps={{ className: "", startAdornment: null, endAdornment: null, ref: null }}
                inputProps={{ value: "MUDDLE" }}
            />
        );

        const enhancementIcon = screen.queryByAltText("MUDDLE");

        expect(enhancementIcon).toBeInTheDocument();
    });
});
