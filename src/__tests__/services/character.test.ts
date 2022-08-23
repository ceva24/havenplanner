import {
    abilityCardCanBeUnlockedForCharacter,
    calculateLevel,
    isUnlockedAbilityCardForCharacter,
} from "@/services/character";
import { characterClasses } from "@/loaders/class";

describe("calculateLevel", () => {
    interface ExperienceLevelProps {
        experience: number;
        level: number;
    }

    it.each`
        experience    | level
        ${0}          | ${1}
        ${44}         | ${1}
        ${45}         | ${2}
        ${46}         | ${2}
        ${95}         | ${3}
        ${150}        | ${4}
        ${210}        | ${5}
        ${275}        | ${6}
        ${345}        | ${7}
        ${420}        | ${8}
        ${499}        | ${8}
        ${500}        | ${9}
        ${501}        | ${9}
        ${9_000_000}  | ${9}
        ${-45}        | ${1}
        ${Number.NaN} | ${1}
    `(
        "sets the character level to $level when the experience value is $experience",
        ({ experience, level }: ExperienceLevelProps) => {
            expect(calculateLevel(experience)).toEqual(level);
        }
    );
});

describe("isUnlockedAbilityCardForCharacter", () => {
    it("returns true when the character's unlocked ability cards includes this card", () => {
        const character: Character = {
            name: "My Char",
            experience: 500,
            gold: 50,
            notes: "Hello haven",
            characterClass: characterClasses[0],
            items: [],
            unlockedAbilityCards: [characterClasses[0].abilityCards[0]],
        };

        const result = isUnlockedAbilityCardForCharacter(character, characterClasses[0].abilityCards[0]);

        expect(result).toEqual(true);
    });

    it("returns false when the character's unlocked ability cards does not include this card", () => {
        const character: Character = {
            name: "My Char",
            experience: 500,
            gold: 50,
            notes: "Hello haven",
            characterClass: characterClasses[0],
            items: [],
            unlockedAbilityCards: [characterClasses[0].abilityCards[1]],
        };

        const result = isUnlockedAbilityCardForCharacter(character, characterClasses[0].abilityCards[0]);

        expect(result).toEqual(false);
    });
});

describe("abilityCardCanBeUnlockedForCharacter", () => {
    it("returns true when the character has unlocks remaining, is the same level as the card, and has not already unlocked the other card at this level", () => {
        const abilityCard = characterClasses[0].abilityCards[14];

        const character: Character = {
            name: "My Char",
            experience: 55,
            gold: 50,
            notes: "Hello haven",
            characterClass: characterClasses[0],
            items: [],
            unlockedAbilityCards: [],
        };

        const result = abilityCardCanBeUnlockedForCharacter(character, abilityCard);

        expect(result).toEqual(true);
    });

    it("returns true when the character has unlocks remaining, is a higher level than the card, and has already unlocked the other card at this level", () => {
        const abilityCard = characterClasses[0].abilityCards[14];

        const character: Character = {
            name: "My Char",
            experience: 500,
            gold: 50,
            notes: "Hello haven",
            characterClass: characterClasses[0],
            items: [],
            unlockedAbilityCards: [characterClasses[0].abilityCards[13]],
        };

        const result = abilityCardCanBeUnlockedForCharacter(character, abilityCard);

        expect(result).toEqual(true);
    });

    it("returns false when the character has unlocks remaining, is the same level as the card, and has already unlocked the other card at this level", () => {
        const abilityCard = characterClasses[0].abilityCards[15];

        const character: Character = {
            name: "My Char",
            experience: 100,
            gold: 50,
            notes: "Hello haven",
            characterClass: characterClasses[0],
            items: [],
            unlockedAbilityCards: [characterClasses[0].abilityCards[16]],
        };

        const result = abilityCardCanBeUnlockedForCharacter(character, abilityCard);

        expect(result).toEqual(false);
    });

    it("returns false when the character has unlocks remaining but the card is of a higher level", () => {
        const abilityCard = characterClasses[0].abilityCards[14];

        const character: Character = {
            name: "My Char",
            experience: 45,
            gold: 50,
            notes: "Hello haven",
            characterClass: characterClasses[0],
            items: [],
            unlockedAbilityCards: [],
        };

        const result = abilityCardCanBeUnlockedForCharacter(character, abilityCard);

        expect(result).toEqual(true);
    });

    it("returns false when the character has no unlocks remaining", () => {
        const abilityCard = characterClasses[0].abilityCards[14];

        const character: Character = {
            name: "My Char",
            experience: 100,
            gold: 50,
            notes: "Hello haven",
            characterClass: characterClasses[0],
            items: [],
            unlockedAbilityCards: [characterClasses[0].abilityCards[13], characterClasses[0].abilityCards[15]],
        };

        const result = abilityCardCanBeUnlockedForCharacter(character, abilityCard);

        expect(result).toEqual(false);
    });

    it("returns false if the card level is non-numeric", () => {
        const abilityCard = characterClasses[0].abilityCards[12];

        const character: Character = {
            name: "My Char",
            experience: 55,
            gold: 50,
            notes: "Hello haven",
            characterClass: characterClasses[0],
            items: [],
            unlockedAbilityCards: [],
        };

        const result = abilityCardCanBeUnlockedForCharacter(character, abilityCard);

        expect(result).toEqual(false);
    });
});
