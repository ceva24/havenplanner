import { render, screen } from "@testing-library/react";
import { createTestCharacter } from "@/testutils";
import AvailableAbilityCard, { toggleCardAddedToHand } from "@/components/ability-cards/hand/available-ability-card";

const character: Character = createTestCharacter();

const setCharacter = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
});

describe("available ability card", () => {
    it("renders a button", () => {
        render(
            <AvailableAbilityCard
                abilityCard={character.characterClass.abilityCards[0]}
                character={character}
                setCharacter={setCharacter}
            />
        );

        const checkbox = screen.queryByRole("checkbox", { name: character.characterClass.abilityCards[0].name });

        expect(checkbox).toBeInTheDocument();
    });

    it("renders the card", () => {
        render(
            <AvailableAbilityCard
                abilityCard={character.characterClass.abilityCards[0]}
                character={character}
                setCharacter={setCharacter}
            />
        );

        const card = screen.queryByRole("img", { name: character.characterClass.abilityCards[0].name });

        expect(card).toBeInTheDocument();
    });
});

describe("addCardToHand", () => {
    it("adds the card to the hand", () => {
        toggleCardAddedToHand(character, setCharacter, character.characterClass.abilityCards[0]);

        expect(setCharacter).toHaveBeenCalledTimes(1);

        const newCharacter: Character = setCharacter.mock.calls[0][0] as Character;

        expect(newCharacter.hand).toHaveLength(1);
        expect(newCharacter.hand[0]).toEqual(character.characterClass.abilityCards[0]);
    });

    it("removes a card from the hand that is already present", () => {
        const character: Character = createTestCharacter();
        character.hand = [character.characterClass.abilityCards[0]];

        toggleCardAddedToHand(character, setCharacter, character.characterClass.abilityCards[0]);

        expect(setCharacter).toHaveBeenCalledTimes(1);

        const newCharacter: Character = setCharacter.mock.calls[0][0] as Character;

        expect(newCharacter.hand).toHaveLength(0);
    });

    it("does not add a card if the hand limit has been reached", () => {
        const abilityCardOne: AbilityCard = {
            id: 1,
            name: "Trample",
            level: "1",
            imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-trample.webp",
        };

        const abilityCardTwo: AbilityCard = {
            id: 1,
            name: "Juggernaut",
            level: "2",
            imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-juggernaut.webp",
        };

        const characterWithMaxHandSize: Character = createTestCharacter({
            characterClass: {
                id: 0,
                name: "Brute",
                imageUrl: "/images/character-icons/gloomhaven/gh-brute.webp",
                characterMatFrontImageUrl: "/images/character-mats/gloomhaven/gh-brute.webp",
                characterMatBackImageUrl: "/images/character-mats/gloomhaven/gh-brute-back.webp",
                cardBackImageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-br-back.webp",
                handSize: 1,
                abilityCards: [abilityCardOne, abilityCardTwo],
            },
            hand: [abilityCardOne],
        });

        toggleCardAddedToHand(characterWithMaxHandSize, setCharacter, abilityCardTwo);

        expect(setCharacter).toHaveBeenCalledTimes(0);

        expect(characterWithMaxHandSize.hand).toHaveLength(1);
        expect(characterWithMaxHandSize.hand[0]).toEqual(abilityCardOne);
    });
});
