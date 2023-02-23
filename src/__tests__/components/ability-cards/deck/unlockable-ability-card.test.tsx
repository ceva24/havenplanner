import { render, screen } from "@testing-library/react";
import UnlockableAbilityCard, { toggleAbilityCard } from "@/components/ability-cards/deck/unlockable-ability-card";
import * as deckService from "@/services/ability-cards/deck";
import { createTestCharacter } from "@/testutils";

const character: Character = createTestCharacter();

const setCharacter = jest.fn();

jest.mock("@/services/ability-cards/deck", () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return {
        __esModule: true,
        ...jest.requireActual("@/services/ability-cards/deck"),
    };
});

beforeEach(() => {
    jest.resetAllMocks();
});

describe("unlockable ability card", () => {
    it("renders an active ability card when the card is unlocked", () => {
        jest.spyOn(deckService, "isUnlockedAbilityCardForCharacter").mockReturnValueOnce(true);
        jest.spyOn(deckService, "abilityCardCanBeUnlockedForCharacter").mockReturnValueOnce(false);

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
        jest.spyOn(deckService, "isUnlockedAbilityCardForCharacter").mockReturnValueOnce(false);
        jest.spyOn(deckService, "abilityCardCanBeUnlockedForCharacter").mockReturnValueOnce(true);

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
        jest.spyOn(deckService, "isUnlockedAbilityCardForCharacter").mockReturnValueOnce(false);
        jest.spyOn(deckService, "abilityCardCanBeUnlockedForCharacter").mockReturnValueOnce(false);

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

describe("toggleAbilityCard", () => {
    it("unlocks a card", () => {
        jest.spyOn(deckService, "isUnlockedAbilityCardForCharacter").mockReturnValueOnce(false);

        toggleAbilityCard(character, setCharacter, character.characterClass.abilityCards[0]);

        const newCharacter: Character = setCharacter.mock.calls[0][0] as Character;

        expect(setCharacter).toHaveBeenCalledTimes(1);

        expect(newCharacter.unlockedAbilityCards).toHaveLength(1);
        expect(newCharacter.unlockedAbilityCards[0]).toEqual(character.characterClass.abilityCards[0]);
    });

    it("locks a card that is already unlocked", () => {
        jest.spyOn(deckService, "isUnlockedAbilityCardForCharacter").mockReturnValueOnce(true);

        const abilityCard: AbilityCard = {
            id: 1,
            name: "Juggernaut",
            level: "2",
            imageUrl: "/character-ability-cards/gloomhaven/BR/gh-juggernaut.webp",
            enhancementSlots: [],
        };

        const characterWithUnlockedCard: Character = createTestCharacter({
            characterClass: {
                id: 0,
                name: "Brute",
                imageUrl: "/character-icons/gloomhaven/gh-brute.webp",
                characterMatFrontImageUrl: "/character-mats/gloomhaven/gh-brute.webp",
                characterMatBackImageUrl: "/character-mats/gloomhaven/gh-brute-back.webp",
                cardBackImageUrl: "/character-ability-cards/gloomhaven/BR/gh-br-back.webp",
                handSize: 10,
                abilityCards: [abilityCard],
                perks: [],
            },
            unlockedAbilityCards: [abilityCard],
        });

        toggleAbilityCard(
            characterWithUnlockedCard,
            setCharacter,
            characterWithUnlockedCard.characterClass.abilityCards[0]
        );

        const newCharacter: Character = setCharacter.mock.calls[0][0] as Character;

        expect(setCharacter).toHaveBeenCalledTimes(1);

        expect(newCharacter.unlockedAbilityCards).toHaveLength(0);
    });

    it("removes a card being locked from the hand", () => {
        jest.spyOn(deckService, "isUnlockedAbilityCardForCharacter").mockReturnValueOnce(true);

        const abilityCard: AbilityCard = {
            id: 1,
            name: "Juggernaut",
            level: "2",
            imageUrl: "/character-ability-cards/gloomhaven/BR/gh-juggernaut.webp",
            enhancementSlots: [],
        };

        const characterWithUnlockedCard: Character = createTestCharacter({
            characterClass: {
                id: 0,
                name: "Brute",
                imageUrl: "/character-icons/gloomhaven/gh-brute.webp",
                characterMatFrontImageUrl: "/character-mats/gloomhaven/gh-brute.webp",
                characterMatBackImageUrl: "/character-mats/gloomhaven/gh-brute-back.webp",
                cardBackImageUrl: "/character-ability-cards/gloomhaven/BR/gh-br-back.webp",
                handSize: 10,
                abilityCards: [abilityCard],
                perks: [],
            },
            unlockedAbilityCards: [abilityCard],
            hand: [abilityCard],
        });
        toggleAbilityCard(
            characterWithUnlockedCard,
            setCharacter,
            characterWithUnlockedCard.characterClass.abilityCards[0]
        );

        const newCharacter: Character = setCharacter.mock.calls[0][0] as Character;

        expect(setCharacter).toHaveBeenCalledTimes(1);

        expect(newCharacter.hand).toHaveLength(0);
    });
});
