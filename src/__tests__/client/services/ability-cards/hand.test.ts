import {
    getAllAvailableAbilityCardsForCharacter,
    isCardInHandForCharacter,
    wouldBeExceedingHandSizeLimit,
} from "@/client/services/ability-cards/hand";
import { createTestCharacter } from "@/test/create-test-fixtures";

describe("getAllAvailableAbilityCardsForCharacter", () => {
    it("includes level 1 cards", () => {
        const character: Character = createTestCharacter();

        character.characterClass.abilityCards = [
            {
                id: 1,
                name: "Trample",
                level: "1",
                imageUrl: "/character-ability-cards/gloomhaven/BR/gh-trample.webp",
                enhancementSlots: [],
            },
        ];

        const availableAbilityCards = getAllAvailableAbilityCardsForCharacter(character);

        expect(availableAbilityCards).toHaveLength(1);
    });

    it("includes level X cards", () => {
        const character: Character = createTestCharacter();

        character.characterClass.abilityCards = [
            {
                id: 11,
                name: "Skewer",
                level: "X",
                imageUrl: "/character-ability-cards/gloomhaven/BR/gh-skewer.webp",
                enhancementSlots: [],
            },
        ];

        const availableAbilityCards = getAllAvailableAbilityCardsForCharacter(character);

        expect(availableAbilityCards).toHaveLength(1);
    });

    it("includes all unlocked ability cards", () => {
        const abilityCard: AbilityCard = {
            id: 14,
            name: "Fatal Advance",
            level: "2",
            imageUrl: "/character-ability-cards/gloomhaven/BR/gh-fatal-advance.webp",
            enhancementSlots: [],
        };

        const character: Character = createTestCharacter();

        character.characterClass.abilityCards = [abilityCard];
        character.unlockedAbilityCards = [abilityCard];

        const availableAbilityCards = getAllAvailableAbilityCardsForCharacter(character);

        expect(availableAbilityCards).toHaveLength(1);
    });

    it("excludes locked cards level 2 and above", () => {
        const character: Character = createTestCharacter();

        character.characterClass.abilityCards = [
            {
                id: 14,
                name: "Fatal Advance",
                level: "2",
                imageUrl: "/character-ability-cards/gloomhaven/BR/gh-fatal-advance.webp",
                enhancementSlots: [],
            },
        ];

        const availableAbilityCards = getAllAvailableAbilityCardsForCharacter(character);

        expect(availableAbilityCards).toHaveLength(0);
    });

    it("sorts cards by id", () => {
        const character: Character = createTestCharacter();
        character.unlockedAbilityCards = [
            character.characterClass.abilityCards[2],
            character.characterClass.abilityCards[1],
        ];

        const availableAbilityCardsIds = getAllAvailableAbilityCardsForCharacter(character).map(
            (abilityCard: AbilityCard) => abilityCard.id
        );

        expect(availableAbilityCardsIds).toEqual([1, 2, 3]);
    });
});

describe("isCardInHandForCharacter", () => {
    it("returns true when the card is in the hand", () => {
        const character: Character = createTestCharacter();
        character.hand = [character.characterClass.abilityCards[0]];

        const result = isCardInHandForCharacter(character, character.characterClass.abilityCards[0]);

        expect(result).toEqual(true);
    });

    it("returns false when the card is not in the hand", () => {
        const character: Character = createTestCharacter();

        const result = isCardInHandForCharacter(character, character.characterClass.abilityCards[0]);

        expect(result).toEqual(false);
    });
});

describe("wouldBeExceedingHandSizeLimit", () => {
    it("returns false if the card is in hand and the hand size limit has not been met", () => {
        const character: Character = createTestCharacter();

        const abilityCard = character.characterClass.abilityCards[0];

        character.hand = [abilityCard];
        character.characterClass.handSize = 10;

        expect(wouldBeExceedingHandSizeLimit(character, abilityCard)).toEqual(false);
    });

    it("returns false if the card is in hand and the hand size limit has been met", () => {
        const character: Character = createTestCharacter();

        const abilityCard = character.characterClass.abilityCards[0];

        character.hand = [abilityCard];
        character.characterClass.handSize = 1;

        expect(wouldBeExceedingHandSizeLimit(character, abilityCard)).toEqual(false);
    });

    it("returns false if the card is not in hand and the hand size limit has not been met", () => {
        const character: Character = createTestCharacter();

        const abilityCard = character.characterClass.abilityCards[0];

        character.hand = [];
        character.characterClass.handSize = 10;

        expect(wouldBeExceedingHandSizeLimit(character, abilityCard)).toEqual(false);
    });

    it("returns true if the card is not in hand and the hand size limit has been met", () => {
        const character: Character = createTestCharacter();

        character.hand = [character.characterClass.abilityCards[0]];
        character.characterClass.handSize = 1;

        expect(wouldBeExceedingHandSizeLimit(character, character.characterClass.abilityCards[1])).toEqual(true);
    });
});
