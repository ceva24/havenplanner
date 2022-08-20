import { render, screen } from "@testing-library/react";
import DisabledAbilityCard from "@/components/ability-cards/disabled-ability-card";

const abilityCard = {
    id: 1,
    name: "Trample",
    level: "2",
    imageUrl: "/worldhaven/images/character-ability-cards/gloomhaven/BR/gh-trample.webp",
};

describe("disabled ability card", () => {
    it("renders a disabled checkbox", () => {
        render(<DisabledAbilityCard abilityCard={abilityCard} />);

        const checkbox = screen.getByRole("checkbox", { name: "Cannot unlock this ability card" });

        expect(checkbox).toBeInTheDocument();
        expect(checkbox.getAttribute("aria-disabled")).toEqual("true");
    });

    it("renders the card", () => {
        render(<DisabledAbilityCard abilityCard={abilityCard} />);

        const card = screen.queryByRole("img", { name: "Trample" });

        expect(card).toBeInTheDocument();
    });

    it("renders a disabled card", () => {
        render(<DisabledAbilityCard abilityCard={abilityCard} />);

        const lockIcon = screen.getByTestId("BlockIcon");

        expect(lockIcon).toBeInTheDocument();
    });
});
