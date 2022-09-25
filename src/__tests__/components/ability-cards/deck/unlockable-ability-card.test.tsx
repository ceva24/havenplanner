import { render, screen } from "@testing-library/react";
import UnlockableAbilityCard from "@/components/ability-cards/deck/unlockable-ability-card";
import * as characterService from "@/services/character";
import { createTestCharacter } from "@/testutils";

const character: Character = createTestCharacter();

const setCharacter = jest.fn();

jest.mock("@/services/character", () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return {
        __esModule: true,
        ...jest.requireActual("@/services/character"),
    };
});

beforeEach(() => {
    jest.resetAllMocks();
});

describe("unlockable ability card", () => {
    it("renders an active ability card when the card is unlocked", () => {
        jest.spyOn(characterService, "isUnlockedAbilityCardForCharacter").mockReturnValueOnce(true);
        jest.spyOn(characterService, "abilityCardCanBeUnlockedForCharacter").mockReturnValueOnce(false);

        render(
            <UnlockableAbilityCard
                abilityCard={character.characterClass.abilityCards[0]}
                character={character}
                setCharacter={setCharacter}
            />
        );

        const checkbox = screen.queryByRole("checkbox", { name: character.characterClass.abilityCards[0].name });

        expect(checkbox).toBeInTheDocument();
    });

    it("renders an active ability card when the card can be unlocked", () => {
        jest.spyOn(characterService, "isUnlockedAbilityCardForCharacter").mockReturnValueOnce(false);
        jest.spyOn(characterService, "abilityCardCanBeUnlockedForCharacter").mockReturnValueOnce(true);

        render(
            <UnlockableAbilityCard
                abilityCard={character.characterClass.abilityCards[0]}
                character={character}
                setCharacter={setCharacter}
            />
        );

        const checkbox = screen.queryByRole("checkbox", { name: character.characterClass.abilityCards[0].name });

        expect(checkbox).toBeInTheDocument();
    });

    it("renders a disabled ability card when the card cannot be unlocked", () => {
        jest.spyOn(characterService, "isUnlockedAbilityCardForCharacter").mockReturnValueOnce(false);
        jest.spyOn(characterService, "abilityCardCanBeUnlockedForCharacter").mockReturnValueOnce(false);

        render(
            <UnlockableAbilityCard
                abilityCard={character.characterClass.abilityCards[0]}
                character={character}
                setCharacter={setCharacter}
            />
        );

        const checkbox = screen.queryByRole("checkbox", { name: "Cannot unlock this ability card" });

        expect(checkbox).toBeInTheDocument();
    });
});
