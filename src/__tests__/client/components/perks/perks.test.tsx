import { render, screen } from "@testing-library/react";
import Perks from "@/client/components/perks/perks";
import { createTestCharacter } from "@/test/create-test-fixtures";
import MockComponent from "@/test/mock-component";

jest.mock(
    "@/client/components/perks/perk-list",
    () =>
        function () {
            return <MockComponent name="Test Perk List" />;
        }
);

jest.mock(
    "@/client/components/perks/battle-goal-progress",
    () =>
        function () {
            return <MockComponent name="Test Battle Goal Progress" />;
        }
);

jest.mock(
    "@/client/components/perks/attack-modifiers",
    () =>
        function () {
            return <MockComponent name="Test Attack Modifiers" />;
        }
);

describe("perks", () => {
    it("renders the attack modifier deck", () => {
        render(<Perks character={createTestCharacter()} setCharacter={jest.fn()} />);

        const attackModifierCards = screen.queryByRole("region", { name: "Test Attack Modifiers" });

        expect(attackModifierCards).toBeInTheDocument();
    });

    it("renders the battle goal progress", () => {
        render(<Perks character={createTestCharacter()} setCharacter={jest.fn()} />);

        const battleGoalProgress = screen.queryByRole("region", { name: "Test Battle Goal Progress" });

        expect(battleGoalProgress).toBeInTheDocument();
    });

    it("renders the list of perks", () => {
        render(<Perks character={createTestCharacter()} setCharacter={jest.fn()} />);

        const perkList = screen.queryByRole("region", { name: "Test Perk List" });

        expect(perkList).toBeInTheDocument();
    });
});
