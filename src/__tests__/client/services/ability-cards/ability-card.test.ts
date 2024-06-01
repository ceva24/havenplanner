import {
    abilityCardLevelCanBeUnlockedByCharacter,
    abilityCardsUnlockedAtLevel,
    calculateMaximumUnlockCount,
    determineAbilityCardImageUrl,
} from "@/client/services/ability-cards/ability-card";
import { enhancedAbilityCardsBaseImageUrl } from "@/client/services/ability-cards/enhancement";
import { createTestAbilityCard, createTestCharacter, createTestEnhancement } from "@/test/create-test-fixtures";

const character: Character = createTestCharacter();
character.characterClass.abilityCards = [
    createTestAbilityCard(
        1,
        "1",
        "Trample",
        [
            {
                id: 0,
                name: "Attack",
                types: ["test-numeric"],
            },
            {
                id: 1,
                name: "PIERCE",
                types: ["test-numeric"],
            },
        ],
        "/gloomhaven/BR/gh-trample.webp",
    ),
    createTestAbilityCard(2, "2", "Eye for an Eye", [
        {
            id: 0,
            name: "Attack",
            types: ["test-numeric"],
        },
    ]),
];

beforeEach(() => {
    character.gainedEnhancements = [];
});

describe("calculateMaximumUnlockCount", () => {
    interface LevelCountProperties {
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
    `("returns $count for level $level", ({ level, count }: LevelCountProperties) => {
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
        const character: Character = createTestCharacter();
        const unlockedAbilityCards = [character.characterClass.abilityCards[0]];

        const abilityCardsAtLevel = abilityCardsUnlockedAtLevel(unlockedAbilityCards, "1");

        expect(abilityCardsAtLevel).toEqual(unlockedAbilityCards);
    });

    it("excludes unlocked cards that do not match the level", () => {
        const character: Character = createTestCharacter();
        const unlockedAbilityCards = [character.characterClass.abilityCards[0]];

        const abilityCardsAtLevel = abilityCardsUnlockedAtLevel(unlockedAbilityCards, "2");

        expect(abilityCardsAtLevel).toHaveLength(0);
    });
});

describe("determineAbilityCardImageUrl", () => {
    it("returns the ability card image url when there are no gained enhancements", () => {
        const abilityCardImageUrl = determineAbilityCardImageUrl(character.characterClass.abilityCards[0], character);

        expect(abilityCardImageUrl).toEqual(character.characterClass.abilityCards[0].imageUrl);
    });

    it("returns the ability card image url when there are no gained enhancements for the current ability card", () => {
        character.gainedEnhancements = [
            {
                abilityCard: character.characterClass.abilityCards[1],
                enhancementSlot: character.characterClass.abilityCards[1].enhancementSlots[0],
                enhancement: createTestEnhancement(1, "Test +1", ["test-numeric"]),
            },
        ];

        const abilityCardImageUrl = determineAbilityCardImageUrl(character.characterClass.abilityCards[0], character);

        expect(abilityCardImageUrl).toEqual(character.characterClass.abilityCards[0].imageUrl);
    });

    it("returns a url starting with the enhanced ability card base image url when there are gained enhancements for the current ability card", () => {
        character.gainedEnhancements = [
            {
                abilityCard: character.characterClass.abilityCards[0],
                enhancementSlot: character.characterClass.abilityCards[0].enhancementSlots[0],
                enhancement: createTestEnhancement(1, "Test +1", ["test-numeric"]),
            },
        ];

        const abilityCardImageUrl = determineAbilityCardImageUrl(character.characterClass.abilityCards[0], character);

        expect(abilityCardImageUrl).toStartWith(enhancedAbilityCardsBaseImageUrl);
    });

    it("converts the ability card image url to the appropriate enhanced ability card image path", () => {
        character.gainedEnhancements = [
            {
                abilityCard: character.characterClass.abilityCards[0],
                enhancementSlot: character.characterClass.abilityCards[0].enhancementSlots[0],
                enhancement: createTestEnhancement(1, "Test +1", ["test-numeric"]),
            },
        ];

        const abilityCardImageUrl = determineAbilityCardImageUrl(character.characterClass.abilityCards[0], character);

        expect(abilityCardImageUrl).toMatch(/\/gloomhaven\/BR\/gh-trample\//);
    });

    it("converts the ability card image url to a safe relative enhanced ability card image url", () => {
        character.gainedEnhancements = [
            {
                abilityCard: character.characterClass.abilityCards[0],
                enhancementSlot: character.characterClass.abilityCards[0].enhancementSlots[0],
                enhancement: createTestEnhancement(1, "Test +1", ["test-numeric"]),
            },
        ];

        const abilityCardImageUrl = determineAbilityCardImageUrl(character.characterClass.abilityCards[0], character);

        expect(abilityCardImageUrl).toStartWith(`${enhancedAbilityCardsBaseImageUrl}/gloomhaven/BR/gh-trample/`);
    });

    it("creates a url to a webp file", () => {
        character.gainedEnhancements = [
            {
                abilityCard: character.characterClass.abilityCards[0],
                enhancementSlot: character.characterClass.abilityCards[0].enhancementSlots[0],
                enhancement: createTestEnhancement(1, "Test +1", ["test-numeric"]),
            },
        ];

        const abilityCardImageUrl = determineAbilityCardImageUrl(character.characterClass.abilityCards[0], character);

        expect(abilityCardImageUrl).toMatch(/\.webp$/);
    });

    it("creates a file name with the enhancement name", () => {
        character.gainedEnhancements = [
            {
                abilityCard: character.characterClass.abilityCards[0],
                enhancementSlot: character.characterClass.abilityCards[0].enhancementSlots[0],
                enhancement: createTestEnhancement(1, "Test", ["test-numeric"]),
            },
        ];

        const abilityCardImageUrl = determineAbilityCardImageUrl(character.characterClass.abilityCards[0], character);

        expect(abilityCardImageUrl).toMatch(/\/test/);
    });

    it("uses gained enhancements for the correct ability card", () => {
        character.gainedEnhancements = [
            {
                abilityCard: character.characterClass.abilityCards[0],
                enhancementSlot: character.characterClass.abilityCards[0].enhancementSlots[0],
                enhancement: createTestEnhancement(1, "Test", ["test-numeric"]),
            },
            {
                abilityCard: character.characterClass.abilityCards[1],
                enhancementSlot: character.characterClass.abilityCards[1].enhancementSlots[0],
                enhancement: createTestEnhancement(2, "Check", ["test-numeric"]),
            },
        ];

        const abilityCardImageUrl = determineAbilityCardImageUrl(character.characterClass.abilityCards[0], character);

        expect(abilityCardImageUrl).toMatch(/test/);
    });

    it("creates a file name with none for slots with no gained enhancements", () => {
        character.gainedEnhancements = [
            {
                abilityCard: character.characterClass.abilityCards[0],
                enhancementSlot: character.characterClass.abilityCards[0].enhancementSlots[0],
                enhancement: createTestEnhancement(1, "Test", ["test-numeric"]),
            },
        ];

        const abilityCardImageUrl = determineAbilityCardImageUrl(character.characterClass.abilityCards[0], character);

        expect(abilityCardImageUrl).toMatch(/\/test-none\./);
    });

    it("create a file name for an ability card with all enhancement slots filled", () => {
        character.gainedEnhancements = [
            {
                abilityCard: character.characterClass.abilityCards[0],
                enhancementSlot: character.characterClass.abilityCards[0].enhancementSlots[0],
                enhancement: createTestEnhancement(1, "Test", ["test-numeric"]),
            },
            {
                abilityCard: character.characterClass.abilityCards[0],
                enhancementSlot: character.characterClass.abilityCards[0].enhancementSlots[1],
                enhancement: createTestEnhancement(2, "Check", ["test-numeric"]),
            },
        ];

        const abilityCardImageUrl = determineAbilityCardImageUrl(character.characterClass.abilityCards[0], character);

        expect(abilityCardImageUrl).toMatch(/\/test-check\./);
    });

    it("creates a full url for an enhanced ability card", () => {
        character.gainedEnhancements = [
            {
                abilityCard: character.characterClass.abilityCards[0],
                enhancementSlot: character.characterClass.abilityCards[0].enhancementSlots[0],
                enhancement: createTestEnhancement(1, "Test", ["test-numeric"]),
            },
            {
                abilityCard: character.characterClass.abilityCards[0],
                enhancementSlot: character.characterClass.abilityCards[0].enhancementSlots[1],
                enhancement: createTestEnhancement(2, "Check", ["test-numeric"]),
            },
        ];

        const abilityCardImageUrl = determineAbilityCardImageUrl(character.characterClass.abilityCards[0], character);

        expect(abilityCardImageUrl).toEqual(
            `${enhancedAbilityCardsBaseImageUrl}/gloomhaven/BR/gh-trample/test-check.webp`,
        );
    });
});
