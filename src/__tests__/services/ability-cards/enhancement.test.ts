import {
    determineAbilityCardImageUrl,
    enhancedAbilityCardsBaseImageUrl,
    convertEnhancementNameToKey,
    getPossibleEnhancementsFor,
} from "@/services/ability-cards/enhancement";
import { createTestCharacter, createTestEnhancement } from "@/test/create-test-fixtures";

describe("determineAbilityCardImageUrl", () => {
    it("returns the ability card image url when there are no gained enhancements", () => {
        const character: Character = createTestCharacter();

        const abilityCardImageUrl = determineAbilityCardImageUrl(character.characterClass.abilityCards[0], character);

        expect(abilityCardImageUrl).toEqual(character.characterClass.abilityCards[0].imageUrl);
    });

    it("returns the ability card image url when there are no gained enhancements for the current ability card", () => {
        const character: Character = createTestCharacter();
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
        const character: Character = createTestCharacter();
        character.gainedEnhancements = [
            {
                abilityCard: character.characterClass.abilityCards[0],
                enhancementSlot: character.characterClass.abilityCards[0].enhancementSlots[0],
                enhancement: createTestEnhancement(1, "Test +1", ["test-numeric"]),
            },
        ];

        const abilityCardImageUrl = determineAbilityCardImageUrl(character.characterClass.abilityCards[0], character);

        expect(abilityCardImageUrl).toMatch(new RegExp(`^${enhancedAbilityCardsBaseImageUrl}`));
    });

    it("converts the ability card image url to the appropriate enhanced ability card image path", () => {
        const character: Character = createTestCharacter();
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
        const character: Character = createTestCharacter();

        const abilityCard: AbilityCard = {
            id: 1,
            name: "Trample",
            level: "2",
            imageUrl: "character-ability-cards/gloomhaven/BR/gh-trample.webp",
            enhancementSlots: [],
        };

        character.characterClass.abilityCards[0] = abilityCard;

        character.gainedEnhancements = [
            {
                abilityCard: character.characterClass.abilityCards[0],
                enhancementSlot: character.characterClass.abilityCards[0].enhancementSlots[0],
                enhancement: createTestEnhancement(1, "Test +1", ["test-numeric"]),
            },
        ];

        const abilityCardImageUrl = determineAbilityCardImageUrl(character.characterClass.abilityCards[0], character);

        expect(abilityCardImageUrl).toMatch(
            new RegExp(`^${enhancedAbilityCardsBaseImageUrl}/gloomhaven/BR/gh-trample/`)
        );
    });

    it("creates a url to a webp file", () => {
        const character: Character = createTestCharacter();
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
        const character: Character = createTestCharacter();
        character.gainedEnhancements = [
            {
                abilityCard: character.characterClass.abilityCards[3],
                enhancementSlot: character.characterClass.abilityCards[3].enhancementSlots[0],
                enhancement: createTestEnhancement(1, "Test", ["test-numeric"]),
            },
        ];

        const abilityCardImageUrl = determineAbilityCardImageUrl(character.characterClass.abilityCards[3], character);

        expect(abilityCardImageUrl).toMatch(/\/test\./);
    });

    it("uses gained enhancements for the correct ability card", () => {
        const character: Character = createTestCharacter();
        character.gainedEnhancements = [
            {
                abilityCard: character.characterClass.abilityCards[3],
                enhancementSlot: character.characterClass.abilityCards[3].enhancementSlots[0],
                enhancement: createTestEnhancement(1, "Test", ["test-numeric"]),
            },
            {
                abilityCard: character.characterClass.abilityCards[0],
                enhancementSlot: character.characterClass.abilityCards[0].enhancementSlots[0],
                enhancement: createTestEnhancement(2, "Check", ["test-numeric"]),
            },
        ];

        const abilityCardImageUrl = determineAbilityCardImageUrl(character.characterClass.abilityCards[3], character);

        expect(abilityCardImageUrl).toMatch(/\/test\./);
    });

    it("creates a file name with none for slots with no gained enhancements", () => {
        const character: Character = createTestCharacter();
        character.gainedEnhancements = [
            {
                abilityCard: character.characterClass.abilityCards[1],
                enhancementSlot: character.characterClass.abilityCards[1].enhancementSlots[1],
                enhancement: createTestEnhancement(1, "Test", ["test-numeric"]),
            },
        ];

        const abilityCardImageUrl = determineAbilityCardImageUrl(character.characterClass.abilityCards[1], character);

        expect(abilityCardImageUrl).toMatch(/\/none-test-none\./);
    });

    it("create a file name for an ability card with all enhancement slots filled", () => {
        const character: Character = createTestCharacter();
        character.gainedEnhancements = [
            {
                abilityCard: character.characterClass.abilityCards[1],
                enhancementSlot: character.characterClass.abilityCards[1].enhancementSlots[0],
                enhancement: createTestEnhancement(1, "Test", ["test-numeric"]),
            },
            {
                abilityCard: character.characterClass.abilityCards[1],
                enhancementSlot: character.characterClass.abilityCards[1].enhancementSlots[1],
                enhancement: createTestEnhancement(2, "Check", ["test-numeric"]),
            },
            {
                abilityCard: character.characterClass.abilityCards[1],
                enhancementSlot: character.characterClass.abilityCards[1].enhancementSlots[2],
                enhancement: createTestEnhancement(3, "Blep", ["test-numeric"]),
            },
        ];

        const abilityCardImageUrl = determineAbilityCardImageUrl(character.characterClass.abilityCards[1], character);

        expect(abilityCardImageUrl).toMatch(/\/test-check-blep\./);
    });

    it("creates a full url for an enhanced ability card", () => {
        const character: Character = createTestCharacter();
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
            {
                abilityCard: character.characterClass.abilityCards[0],
                enhancementSlot: character.characterClass.abilityCards[0].enhancementSlots[2],
                enhancement: createTestEnhancement(3, "Blep", ["test-numeric"]),
            },
            {
                abilityCard: character.characterClass.abilityCards[0],
                enhancementSlot: character.characterClass.abilityCards[0].enhancementSlots[3],
                enhancement: createTestEnhancement(4, "Mlem", ["test-numeric"]),
            },
            {
                abilityCard: character.characterClass.abilityCards[0],
                enhancementSlot: character.characterClass.abilityCards[0].enhancementSlots[4],
                enhancement: createTestEnhancement(5, "Flib", ["test-numeric"]),
            },
        ];

        const abilityCardImageUrl = determineAbilityCardImageUrl(character.characterClass.abilityCards[0], character);

        expect(abilityCardImageUrl).toEqual(
            `${enhancedAbilityCardsBaseImageUrl}/gloomhaven/BR/gh-trample/test-check-blep-mlem-flib.webp`
        );
    });
});

describe("convertEnhancementNameToKey", () => {
    interface NameKeyProps {
        name: string;
        key: string;
    }

    it.each`
        name             | key
        ${"+1"}          | ${"plus-one"}
        ${"POISON"}      | ${"poison"}
        ${"WOUND"}       | ${"wound"}
        ${"MUDDLE"}      | ${"muddle"}
        ${"IMMOBILIZE"}  | ${"immobilize"}
        ${"DISARM"}      | ${"disarm"}
        ${"CURSE"}       | ${"curse"}
        ${"STRENGTHEN"}  | ${"strengthen"}
        ${"BLESS"}       | ${"bless"}
        ${"Jump"}        | ${"jump"}
        ${"Fire"}        | ${"fire"}
        ${"Ice"}         | ${"ice"}
        ${"Air"}         | ${"air"}
        ${"Earth"}       | ${"earth"}
        ${"Light"}       | ${"light"}
        ${"Dark"}        | ${"dark"}
        ${"Any element"} | ${"any-element"}
        ${"Attack Hex"}  | ${"hex"}
    `("converts enhancement name $name to key $key", ({ name, key }: NameKeyProps) => {
        const result = convertEnhancementNameToKey(name);

        expect(result).toEqual(key);
    });
});

describe("getPossibleEnhancementsFor", () => {
    it("filters the list of enhancements to valid slot types", () => {
        const enhancements: Enhancement[] = [
            createTestEnhancement(1, "Test Fire", ["test-main-line"]),
            createTestEnhancement(2, "Test +1", ["test-numeric"]),
            createTestEnhancement(3, "Test Bless", ["test-target-self-ally"]),
        ];

        const enhancementSlot: EnhancementSlot = {
            id: 0,
            name: "Move",
            types: ["test-numeric", "test-main-line", "test-move"],
        };

        const possibleEnhancements: Enhancement[] = getPossibleEnhancementsFor(enhancementSlot, enhancements);

        const possibleEnhancementNames = possibleEnhancements.map((enhancement: Enhancement) => enhancement.name);

        expect(possibleEnhancementNames).toHaveLength(2);
        expect(possibleEnhancementNames).toContain("Test +1");
        expect(possibleEnhancementNames).toContain("Test Fire");
    });
});
