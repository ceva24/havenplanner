import { render, screen } from "@testing-library/react";
import EditHandDialog, { toggleCardAddedToHand } from "@/components/ability-cards/hand/edit-hand-dialog";
import { createTestCharacter } from "@/test/test-fixtures";

const character: Character = createTestCharacter();

const setCharacter = jest.fn();

beforeEach(() => {
    jest.resetAllMocks();
});

describe("edit hand dialog", () => {
    it("renders", () => {
        render(<EditHandDialog isOpen character={character} setCharacter={setCharacter} handleClose={jest.fn()} />);

        const editHandDialog = screen.queryByRole("dialog", { name: "Select ability cards" });

        expect(editHandDialog).toBeInTheDocument();
    });

    it("renders available ability cards", () => {
        render(<EditHandDialog isOpen character={character} setCharacter={setCharacter} handleClose={jest.fn()} />);

        const abilityCard = screen.queryByRole("checkbox", { name: "Trample" });

        expect(abilityCard).toBeInTheDocument();
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
            imageUrl: "/character-ability-cards/gloomhaven/BR/gh-trample.webp",
            enhancementSlots: [],
        };

        const abilityCardTwo: AbilityCard = {
            id: 15,
            name: "Juggernaut",
            level: "2",
            imageUrl: "/character-ability-cards/gloomhaven/BR/gh-juggernaut.webp",
            enhancementSlots: [],
        };

        const characterWithMaxHandSize: Character = createTestCharacter({
            characterClass: {
                id: 0,
                name: "Brute",
                imageUrl: "/character-icons/gloomhaven/gh-brute.webp",
                characterMatFrontImageUrl: "/character-mats/gloomhaven/gh-brute.webp",
                characterMatBackImageUrl: "/character-mats/gloomhaven/gh-brute-back.webp",
                cardBackImageUrl: "/character-ability-cards/gloomhaven/BR/gh-br-back.webp",
                handSize: 1,
                abilityCards: [abilityCardOne, abilityCardTwo],
                perks: [],
            },
            hand: [abilityCardOne],
        });

        toggleCardAddedToHand(characterWithMaxHandSize, setCharacter, abilityCardTwo);

        expect(setCharacter).toHaveBeenCalledTimes(0);

        expect(characterWithMaxHandSize.hand).toHaveLength(1);
        expect(characterWithMaxHandSize.hand[0]).toEqual(abilityCardOne);
    });
});
