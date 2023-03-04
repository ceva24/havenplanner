import { characterClasses } from "@/loaders/character-classes";
import {
    abilityCardCanBeToggled,
    abilityCardCanBeUnlockedForCharacter,
    groupCharacterCardsByLevel,
    isUnlockedAbilityCardForCharacter,
    uniqueOrderedCardLevels,
} from "@/services/ability-cards/deck";
import { createTestCharacter } from "@/test/utils";

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

describe("abilityCardCanBeToggled", () => {
    it("returns true if the ability card has been unlocked", () => {
        const character = createTestCharacter();
        const abilityCard = character.characterClass.abilityCards[1];

        character.unlockedAbilityCards = [abilityCard];

        expect(abilityCardCanBeToggled(abilityCard, character)).toEqual(true);
    });

    it("returns true if the ability card can be unlocked", () => {
        const character = createTestCharacter({ experience: 500 });
        const abilityCard = character.characterClass.abilityCards[1];

        expect(abilityCardCanBeToggled(abilityCard, character)).toEqual(true);
    });

    it("returns false if the ability card has not been and cannot be unlocked", () => {
        const character = createTestCharacter({ experience: 1 });
        const abilityCard = character.characterClass.abilityCards[2];

        expect(abilityCardCanBeToggled(abilityCard, character)).toEqual(false);
    });
});

describe("groupCardsByLevel", () => {
    it("groups cards by level", () => {
        const character = createTestCharacter();

        const groups = groupCharacterCardsByLevel(character);

        expect(Object.keys(groups)).toEqual(["1", "2", "3", "4"]);
        expect(groups["1"]).toHaveLength(1);
        expect(groups["2"]).toHaveLength(1);
        expect(groups["3"]).toHaveLength(1);
        expect(groups["4"]).toHaveLength(1);
    });
});

describe("uniqueOrderedCardLevels", () => {
    it("returns a unique ordered list of levels", () => {
        const character = createTestCharacter();
        character.characterClass.abilityCards = [
            character.characterClass.abilityCards[1],
            character.characterClass.abilityCards[0],
            character.characterClass.abilityCards[0],
        ];

        const groups = groupCharacterCardsByLevel(character);

        const uniqueLevels = uniqueOrderedCardLevels(groups);

        expect(uniqueLevels).toEqual(["1", "2"]);
    });
});
