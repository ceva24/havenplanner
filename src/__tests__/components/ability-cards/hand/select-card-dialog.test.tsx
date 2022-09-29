import { render, screen } from "@testing-library/react";
import SelectCardDialog, { toggleCardAddedToHand } from "@/components/ability-cards/hand/select-card-dialog";
import { createTestCharacter } from "@/testutils";

const character: Character = createTestCharacter();

const setCharacter = jest.fn();

beforeEach(() => {
    jest.resetAllMocks();
});

describe("select card dialog", () => {
    it("renders", () => {
        render(<SelectCardDialog isOpen character={character} setCharacter={setCharacter} handleClose={() => ""} />);

        const selectCardDialog = screen.queryByRole("dialog", { name: "Select ability cards" });

        expect(selectCardDialog).toBeInTheDocument();
    });

    it("renders the card total", () => {
        render(<SelectCardDialog isOpen character={character} setCharacter={setCharacter} handleClose={() => ""} />);

        const cardTotal = screen.queryByText("0 / 10");

        expect(cardTotal).toBeInTheDocument();
    });

    it("renders available ability cards", () => {
        render(<SelectCardDialog isOpen character={character} setCharacter={setCharacter} handleClose={() => ""} />);

        const abilityCard = screen.queryByRole("checkbox", { name: "Trample" });

        expect(abilityCard).toBeInTheDocument();
    });

    it("renders the close button", () => {
        render(<SelectCardDialog isOpen character={character} setCharacter={setCharacter} handleClose={() => ""} />);

        const closeButton = screen.queryByRole("button", { name: "Close" });

        expect(closeButton).toBeInTheDocument();
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
