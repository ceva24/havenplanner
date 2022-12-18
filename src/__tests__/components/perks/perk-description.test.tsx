import { render, screen } from "@testing-library/react";
import PerkDescription from "@/components/perks/perk-description";

describe("perk-description", () => {
    it("replaces text in curly braces in the perk description with an image", () => {
        const perk: Perk = {
            description: "description with {shield} icon",
            count: 1,
            add: [],
            remove: [],
        };

        render(<PerkDescription perk={perk} />);

        const text = screen.queryByText("description with icon");
        const image = screen.queryByRole("img", { name: "shield icon" });

        expect(text).toBeInTheDocument();
        expect(image).toBeInTheDocument();
    });

    it("has no effect on a perk description with no curly braces", () => {
        const perk: Perk = {
            description: "description with no shield icon",
            count: 1,
            add: [],
            remove: [],
        };

        render(<PerkDescription perk={perk} />);

        const text = screen.queryByText("description with no shield icon");

        expect(text).toBeInTheDocument();
    });
});
