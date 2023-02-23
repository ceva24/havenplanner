import {
    abilityCardCanBeUnlockedForCharacter,
    getAllAvailableAbilityCardsForCharacter,
    isCardInHandForCharacter,
    isUnlockedAbilityCardForCharacter,
} from "@/services/character";
import { characterClasses } from "@/loaders/character-classes";
import { createTestCharacter } from "@/testutils";

describe("isUnlockedAbilityCardForCharacter", () => {
    it("returns true when the character's unlocked ability cards includes this card", () => {
        const character: Character = createTestCharacter();
        character.unlockedAbilityCards = [character.characterClass.abilityCards[0]];

        const result = isUnlockedAbilityCardForCharacter(character, character.characterClass.abilityCards[0]);

        expect(result).toEqual(true);
    });

    it("returns false when the character's unlocked ability cards does not include this card", () => {
        const character: Character = createTestCharacter();

        const result = isUnlockedAbilityCardForCharacter(character, character.characterClass.abilityCards[0]);

        expect(result).toEqual(false);
    });
});

describe("abilityCardCanBeUnlockedForCharacter", () => {
    it("returns true when the character has unlocks remaining, is the same level as the card, and has not already unlocked the other card at this level", () => {
        const abilityCard = characterClasses[0].abilityCards[14];

        const character: Character = createTestCharacter({
            characterClass: characterClasses[0],
        });

        const result = abilityCardCanBeUnlockedForCharacter(character, abilityCard);

        expect(result).toEqual(true);
    });

    it("returns true when the character has unlocks remaining, is a higher level than the card, and has already unlocked the other card at this level", () => {
        const abilityCard = characterClasses[0].abilityCards[14];

        const character: Character = createTestCharacter({
            characterClass: characterClasses[0],
            unlockedAbilityCards: [characterClasses[0].abilityCards[13]],
        });

        const result = abilityCardCanBeUnlockedForCharacter(character, abilityCard);

        expect(result).toEqual(true);
    });

    it("returns false when the character has unlocks remaining, is the same level as the card, and has already unlocked the other card at this level", () => {
        const abilityCard = characterClasses[0].abilityCards[15];

        const character: Character = createTestCharacter({
            characterClass: characterClasses[0],
            unlockedAbilityCards: [characterClasses[0].abilityCards[16]],
        });

        const result = abilityCardCanBeUnlockedForCharacter(character, abilityCard);

        expect(result).toEqual(false);
    });

    it("returns false when the character has unlocks remaining but the card is of a higher level", () => {
        const abilityCard = characterClasses[0].abilityCards[14];

        const character: Character = createTestCharacter({
            characterClass: characterClasses[0],
        });

        const result = abilityCardCanBeUnlockedForCharacter(character, abilityCard);

        expect(result).toEqual(true);
    });

    it("returns false when the character has no unlocks remaining", () => {
        const abilityCard = characterClasses[0].abilityCards[14];

        const character: Character = createTestCharacter({
            characterClass: characterClasses[0],
            unlockedAbilityCards: [characterClasses[0].abilityCards[13], characterClasses[0].abilityCards[15]],
        });

        const result = abilityCardCanBeUnlockedForCharacter(character, abilityCard);

        expect(result).toEqual(false);
    });

    it("returns true if the card level is non-numeric", () => {
        const abilityCard = characterClasses[0].abilityCards[12];

        const character: Character = createTestCharacter({
            characterClass: characterClasses[0],
        });

        const result = abilityCardCanBeUnlockedForCharacter(character, abilityCard);

        expect(result).toEqual(true);
    });
});

describe("getAllAvailableAbilityCardsForCharacter", () => {
    it("includes level 1 cards", () => {
        const character: Character = createTestCharacter({
            characterClass: {
                id: 0,
                name: "Brute",
                imageUrl: "/character-icons/gloomhaven/gh-brute.webp",
                characterMatFrontImageUrl: "/character-mats/gloomhaven/gh-brute.webp",
                characterMatBackImageUrl: "/character-mats/gloomhaven/gh-brute-back.webp",
                cardBackImageUrl: "/character-ability-cards/gloomhaven/BR/gh-br-back.webp",
                handSize: 10,
                abilityCards: [
                    {
                        id: 1,
                        name: "Trample",
                        level: "1",
                        imageUrl: "/character-ability-cards/gloomhaven/BR/gh-trample.webp",
                        enhancementSlots: [],
                    },
                ],
                perks: [],
            },
        });

        const availableAbilityCards = getAllAvailableAbilityCardsForCharacter(character);

        expect(availableAbilityCards).toHaveLength(1);
    });

    it("includes level X cards", () => {
        const character: Character = createTestCharacter({
            characterClass: {
                id: 0,
                name: "Brute",
                imageUrl: "/character-icons/gloomhaven/gh-brute.webp",
                characterMatFrontImageUrl: "/character-mats/gloomhaven/gh-brute.webp",
                characterMatBackImageUrl: "/character-mats/gloomhaven/gh-brute-back.webp",
                cardBackImageUrl: "/character-ability-cards/gloomhaven/BR/gh-br-back.webp",
                handSize: 10,
                abilityCards: [
                    {
                        id: 11,
                        name: "Skewer",
                        level: "X",
                        imageUrl: "/character-ability-cards/gloomhaven/BR/gh-skewer.webp",
                        enhancementSlots: [],
                    },
                ],
                perks: [],
            },
        });

        const availableAbilityCards = getAllAvailableAbilityCardsForCharacter(character);

        expect(availableAbilityCards).toHaveLength(1);
    });

    it("includes all unlocked ability cards", () => {
        const character: Character = createTestCharacter({
            characterClass: {
                id: 0,
                name: "Brute",
                imageUrl: "/character-icons/gloomhaven/gh-brute.webp",
                characterMatFrontImageUrl: "/character-mats/gloomhaven/gh-brute.webp",
                characterMatBackImageUrl: "/character-mats/gloomhaven/gh-brute-back.webp",
                cardBackImageUrl: "/character-ability-cards/gloomhaven/BR/gh-br-back.webp",
                handSize: 10,
                abilityCards: [
                    {
                        id: 14,
                        name: "Fatal Advance",
                        level: "2",
                        imageUrl: "/character-ability-cards/gloomhaven/BR/gh-fatal-advance.webp",
                        enhancementSlots: [],
                    },
                ],
                perks: [],
            },
            unlockedAbilityCards: [
                {
                    id: 14,
                    name: "Fatal Advance",
                    level: "2",
                    imageUrl: "/character-ability-cards/gloomhaven/BR/gh-fatal-advance.webp",
                    enhancementSlots: [],
                },
            ],
        });

        const availableAbilityCards = getAllAvailableAbilityCardsForCharacter(character);

        expect(availableAbilityCards).toHaveLength(1);
    });

    it("excludes locked cards level 2 and above", () => {
        const character: Character = createTestCharacter({
            characterClass: {
                id: 0,
                name: "Brute",
                imageUrl: "/character-icons/gloomhaven/gh-brute.webp",
                characterMatFrontImageUrl: "/character-mats/gloomhaven/gh-brute.webp",
                characterMatBackImageUrl: "/character-mats/gloomhaven/gh-brute-back.webp",
                cardBackImageUrl: "/character-ability-cards/gloomhaven/BR/gh-br-back.webp",
                handSize: 10,
                abilityCards: [
                    {
                        id: 14,
                        name: "Fatal Advance",
                        level: "2",
                        imageUrl: "/character-ability-cards/gloomhaven/BR/gh-fatal-advance.webp",
                        enhancementSlots: [],
                    },
                ],
                perks: [],
            },
        });

        const availableAbilityCards = getAllAvailableAbilityCardsForCharacter(character);

        expect(availableAbilityCards).toHaveLength(0);
    });

    it("sorts cards by id", () => {
        const character: Character = createTestCharacter({
            characterClass: characterClasses[0],
            unlockedAbilityCards: [characterClasses[0].abilityCards[15], characterClasses[0].abilityCards[13]],
        });

        const availableAbilityCardsIds = getAllAvailableAbilityCardsForCharacter(character).map(
            (abilityCard: AbilityCard) => abilityCard.id
        );

        expect(availableAbilityCardsIds).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16]);
    });
});

describe("isCardInHandForCharacter", () => {
    it("returns true when the card is in the hand", () => {
        const character = createTestCharacter();
        character.hand = [character.characterClass.abilityCards[0]];

        const result = isCardInHandForCharacter(character, character.characterClass.abilityCards[0]);

        expect(result).toEqual(true);
    });

    it("returns false when the card is not in the hand", () => {
        const character = createTestCharacter();

        const result = isCardInHandForCharacter(character, character.characterClass.abilityCards[0]);

        expect(result).toEqual(false);
    });
});
