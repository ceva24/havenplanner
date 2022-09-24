import { render, screen } from "@testing-library/react";
import ActiveAbilityCard, { toggleAbilityCard } from "@/components/ability-cards/active-ability-card";
import { createTestCharacter } from "@/testutils";

const character: Character = createTestCharacter();

const setCharacter = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
});

describe("active ability card", () => {
    it("renders a checkbox", () => {
        render(
            <ActiveAbilityCard
                abilityCard={character.characterClass.abilityCards[0]}
                character={character}
                setCharacter={setCharacter}
            />
        );

        const checkbox = screen.queryByRole("checkbox", { name: "Trample" });

        expect(checkbox).toBeInTheDocument();
    });

    it("renders the card", () => {
        render(
            <ActiveAbilityCard
                abilityCard={character.characterClass.abilityCards[0]}
                character={character}
                setCharacter={setCharacter}
            />
        );

        const card = screen.queryByRole("img", { name: "Trample" });

        expect(card).toBeInTheDocument();
    });

    it("renders a locked card", () => {
        render(
            <ActiveAbilityCard
                abilityCard={character.characterClass.abilityCards[0]}
                character={character}
                setCharacter={setCharacter}
            />
        );

        const lockIcon = screen.getByTestId("LockTwoToneIcon");

        expect(lockIcon).toBeInTheDocument();
    });
});

describe("toggleAbilityCardUnlock", () => {
    it("unlocks a card", () => {
        toggleAbilityCard(character, setCharacter, character.characterClass.abilityCards[0]);

        const newCharacter: Character = setCharacter.mock.calls[0][0] as Character;

        expect(setCharacter).toHaveBeenCalledTimes(1);

        expect(newCharacter.unlockedAbilityCards).toHaveLength(1);
        expect(newCharacter.unlockedAbilityCards[0]).toEqual(character.characterClass.abilityCards[0]);
    });

    it("locks a card that is already unlocked", () => {
        const abilityCard = {
            id: 1,
            name: "Juggernaut",
            level: "2",
            imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-juggernaut.webp",
        };

        const characterWithUnlockedCard: Character = createTestCharacter({
            characterClass: {
                id: 0,
                name: "Brute",
                imageUrl: "/images/character-icons/gloomhaven/gh-brute.webp",
                characterMatFrontImageUrl: "/images/character-mats/gloomhaven/gh-brute.webp",
                characterMatBackImageUrl: "/images/character-mats/gloomhaven/gh-brute-back.webp",
                cardBackImageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-br-back.webp",
                handSize: 10,
                abilityCards: [abilityCard],
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
});
