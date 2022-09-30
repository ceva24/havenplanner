import { render, screen } from "@testing-library/react";
import ActiveAbilityCard from "@/components/ability-cards/active-ability-card";
import { createTestCharacter } from "@/testutils";

const character: Character = createTestCharacter();

beforeEach(() => {
    jest.clearAllMocks();
});

describe("active ability card", () => {
    it("renders a checkbox", () => {
        render(
            <ActiveAbilityCard
                isSelected
                showLockIcon
                abilityCard={character.characterClass.abilityCards[0]}
                action={() => ""}
            />
        );

        const checkbox = screen.queryByRole("checkbox", { name: character.characterClass.abilityCards[0].name });

        expect(checkbox).toBeInTheDocument();
    });

    it("renders the card", () => {
        render(
            <ActiveAbilityCard
                isSelected
                showLockIcon
                abilityCard={character.characterClass.abilityCards[0]}
                action={() => ""}
            />
        );

        const card = screen.queryByRole("img", { name: "Trample" });

        expect(card).toBeInTheDocument();
    });

    it("renders a locked card", () => {
        render(
            <ActiveAbilityCard
                showLockIcon
                abilityCard={character.characterClass.abilityCards[0]}
                action={() => ""}
                isSelected={false}
            />
        );

        const lockIcon = screen.getByTestId("LockTwoToneIcon");

        expect(lockIcon).toBeInTheDocument();
    });
});
