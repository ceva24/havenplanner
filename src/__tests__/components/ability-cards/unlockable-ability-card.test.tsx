import { render, screen } from "@testing-library/react";
import UnlockableAbilityCard from "@/components/ability-cards/unlockable-ability-card";
import * as characterService from "@/services/character";

const character: Character = {
    name: "My Char",
    experience: 25,
    gold: 50,
    notes: "Hello haven",
    characterClass: {
        id: 0,
        name: "Brute",
        imageUrl: "/worldhaven/images/character-icons/gloomhaven/gh-brute.webp",
        characterMatFrontImageUrl: "/worldhaven/images/character-mats/gloomhaven/gh-brute.webp",
        characterMatBackImageUrl: "/worldhaven/images/character-mats/gloomhaven/gh-brute-back.webp",
        abilityCards: [
            {
                id: 1,
                name: "Juggernaut",
                level: "2",
                imageUrl: "/worldhaven/images/character-ability-cards/gloomhaven/BR/gh-juggernaut.webp",
            },
        ],
    },
    items: [],
    unlockedAbilityCards: [],
};

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

        const checkbox = screen.queryByRole("checkbox", { name: "Juggernaut" });

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

        const checkbox = screen.queryByRole("checkbox", { name: "Juggernaut" });

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

        const checkbox = screen.queryByRole("checkbox", { name: "Cannot unlock this card" });

        expect(checkbox).toBeInTheDocument();
    });
});
