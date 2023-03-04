import {
    abilityCardLevelCanBeUnlockedByCharacter,
    abilityCardsUnlockedAtLevel,
    calculateMaximumUnlockCount,
} from "@/services/ability-cards/ability-card";
import { createTestCharacter } from "@/test/utils";

describe("calculateMaximumUnlockCount", () => {
    interface LevelCountProps {
        level: number;
        count: number;
    }

    it.each`
        level | count
        ${1}  | ${0}
        ${2}  | ${1}
        ${3}  | ${2}
        ${4}  | ${3}
        ${5}  | ${4}
        ${6}  | ${5}
        ${7}  | ${6}
        ${8}  | ${7}
        ${9}  | ${8}
    `("returns $count for level $level", ({ level, count }: LevelCountProps) => {
        expect(calculateMaximumUnlockCount(level)).toEqual(count);
    });
});

describe("abilityCardLevelCanBeUnlockedByCharacter", () => {
    it("returns true when the ability card is level X", () => {
        expect(abilityCardLevelCanBeUnlockedByCharacter("X", 1)).toEqual(true);
    });

    it("returns true when the ability card level is less than the character level", () => {
        expect(abilityCardLevelCanBeUnlockedByCharacter("3", 4)).toEqual(true);
    });
    it("returns true when the ability card level is equal to the character level", () => {
        expect(abilityCardLevelCanBeUnlockedByCharacter("3", 3)).toEqual(true);
    });
    it("returns true when the ability card level is greater than the character level", () => {
        expect(abilityCardLevelCanBeUnlockedByCharacter("4", 3)).toEqual(false);
    });
});

describe("abilityCardsUnlockedAtLevel", () => {
    it("includes unlocked cards that match the level", () => {
        const character = createTestCharacter();
        const unlockedAbilityCards = [character.characterClass.abilityCards[0]];

        const abilityCardsAtLevel = abilityCardsUnlockedAtLevel(unlockedAbilityCards, "1");

        expect(abilityCardsAtLevel).toEqual(unlockedAbilityCards);
    });

    it("excludes unlocked cards that do not match the level", () => {
        const character = createTestCharacter();
        const unlockedAbilityCards = [character.characterClass.abilityCards[0]];

        const abilityCardsAtLevel = abilityCardsUnlockedAtLevel(unlockedAbilityCards, "2");

        expect(abilityCardsAtLevel).toHaveLength(0);
    });
});
