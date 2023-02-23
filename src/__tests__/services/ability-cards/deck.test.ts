import { characterClasses } from "@/loaders/character-classes";
import { abilityCardCanBeUnlockedForCharacter, isUnlockedAbilityCardForCharacter } from "@/services/ability-cards/deck";
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
