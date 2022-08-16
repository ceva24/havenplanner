import { render, screen } from "@testing-library/react";
import SelectableAbilityCard, { toggleAbilityCardUnlock } from "@/components/ability-cards/selectable-ability-card";

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
                name: "Trample",
                level: "1",
                imageUrl: "/worldhaven/images/character-ability-cards/gloomhaven/BR/gh-trample.webp",
            },
        ],
    },
    items: [],
    unlockedAbilityCards: [],
};

const setCharacter = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
});

describe("SelectableAbilityCard", () => {
    it("renders a button", () => {
        render(
            <SelectableAbilityCard
                character={character}
                setCharacter={setCharacter}
                abilityCard={character.characterClass.abilityCards[0]}
            />
        );

        const checkbox = screen.queryByRole("checkbox", { name: "Trample" });

        expect(checkbox).toBeInTheDocument();
    });

    it("renders the card", () => {
        render(
            <SelectableAbilityCard
                character={character}
                setCharacter={setCharacter}
                abilityCard={character.characterClass.abilityCards[0]}
            />
        );

        const button = screen.queryByRole("img", { name: "Trample" });

        expect(button).toBeInTheDocument();
    });
});

describe("toggleAbilityCardUnlock", () => {
    it("unlocks a card", () => {
        toggleAbilityCardUnlock(character, setCharacter, character.characterClass.abilityCards[0]);

        const newCharacter: Character = setCharacter.mock.calls[0][0] as Character;

        expect(setCharacter).toHaveBeenCalledTimes(1);

        expect(newCharacter.unlockedAbilityCards).toHaveLength(1);
        expect(newCharacter.unlockedAbilityCards[0]).toEqual(character.characterClass.abilityCards[0]);
    });

    it("locks a card that is already unlocked", () => {
        const card = {
            id: 1,
            name: "Trample",
            level: "1",
            imageUrl: "/worldhaven/images/character-ability-cards/gloomhaven/BR/gh-trample.webp",
        };

        const characterWithUnlockedCard: Character = {
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
                abilityCards: [card],
            },
            items: [],
            unlockedAbilityCards: [card],
        };

        toggleAbilityCardUnlock(
            characterWithUnlockedCard,
            setCharacter,
            characterWithUnlockedCard.characterClass.abilityCards[0]
        );

        const newCharacter: Character = setCharacter.mock.calls[0][0] as Character;

        expect(setCharacter).toHaveBeenCalledTimes(1);

        expect(newCharacter.unlockedAbilityCards).toHaveLength(0);
    });
});
