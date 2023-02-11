import { render, screen } from "@testing-library/react";
import ActiveAbilityCard from "@/components/ability-cards/toggleable-ability-card";
import { createTestCharacter } from "@/testutils";

const character: Character = createTestCharacter();

beforeEach(() => {
    jest.clearAllMocks();
});

describe("toggleable ability card", () => {
    it("renders a checkbox", () => {
        render(
            <ActiveAbilityCard
                isSelected
                showLockIcon
                abilityCard={character.characterClass.abilityCards[0]}
                character={character}
                action={jest.fn()}
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
                character={character}
                action={jest.fn()}
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
                character={character}
                action={jest.fn()}
                isSelected={false}
            />
        );

        const lockIcon = screen.getByTestId("LockTwoToneIcon");

        expect(lockIcon).toBeInTheDocument();
    });
});
