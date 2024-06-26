import { render, screen } from "@testing-library/react";
import DisabledAbilityCard from "@/client/components/ability-cards/disabled-ability-card";
import { createTestCharacter } from "@/test/create-test-fixtures";

const abilityCard: AbilityCard = {
    id: 1,
    name: "Trample",
    level: "2",
    imageUrl: "/character-ability-cards/gloomhaven/BR/gh-trample.webp",
    enhancementSlots: [],
};

const character: Character = createTestCharacter();

describe("disabled ability card", () => {
    it("renders a disabled checkbox with tooltip", () => {
        render(
            <DisabledAbilityCard
                abilityCard={abilityCard}
                character={character}
                tooltipText="Cannot unlock this ability card"
            />,
        );

        const checkbox = screen.getByRole("checkbox", { name: "Cannot unlock this ability card" });

        expect(checkbox).toBeInTheDocument();
        expect(checkbox.getAttribute("aria-disabled")).toEqual("true");
    });

    it("renders the card", () => {
        render(
            <DisabledAbilityCard
                abilityCard={abilityCard}
                character={character}
                tooltipText="Cannot unlock this ability card"
            />,
        );

        const card = screen.queryByRole("img", { name: "Trample" });

        expect(card).toBeInTheDocument();
    });

    it("renders a disabled card", () => {
        render(
            <DisabledAbilityCard
                abilityCard={abilityCard}
                character={character}
                tooltipText="Cannot unlock this ability card"
            />,
        );

        const lockIcon = screen.getByTestId("BlockIcon");

        expect(lockIcon).toBeInTheDocument();
    });
});
