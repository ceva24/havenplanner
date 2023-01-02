import { render, screen } from "@testing-library/react";
import DisabledAbilityCard from "@/components/ability-cards/disabled-ability-card";

const abilityCard: AbilityCard = {
    id: 1,
    name: "Trample",
    level: "2",
    imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-trample.webp",
    enhancementSlots: [],
};

describe("disabled ability card", () => {
    it("renders a disabled checkbox with tooltip", () => {
        render(<DisabledAbilityCard abilityCard={abilityCard} tooltipText="Cannot unlock this ability card" />);

        const checkbox = screen.getByRole("checkbox", { name: "Cannot unlock this ability card" });

        expect(checkbox).toBeInTheDocument();
        expect(checkbox.getAttribute("aria-disabled")).toEqual("true");
    });

    it("renders the card", () => {
        render(<DisabledAbilityCard abilityCard={abilityCard} tooltipText="Cannot unlock this ability card" />);

        const card = screen.queryByRole("img", { name: "Trample" });

        expect(card).toBeInTheDocument();
    });

    it("renders a disabled card", () => {
        render(<DisabledAbilityCard abilityCard={abilityCard} tooltipText="Cannot unlock this ability card" />);

        const lockIcon = screen.getByTestId("BlockIcon");

        expect(lockIcon).toBeInTheDocument();
    });
});
