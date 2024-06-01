import {
    abilityCardHasGainedEnhancements,
    convertEnhancementNameToKey,
    getPossibleEnhancementsFor,
} from "@/client/services/ability-cards/enhancement";
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
        ],
        "/gloomhaven/BR/gh-trample.webp",
    ),
];

beforeEach(() => {
    character.gainedEnhancements = [];
});

describe("abilityCardHasGainedEnhancements", () => {
    it("returns true when a card has gained an enhancement", () => {
        character.gainedEnhancements = [
            {
                abilityCard: character.characterClass.abilityCards[0],
                enhancementSlot: character.characterClass.abilityCards[0].enhancementSlots[0],
                enhancement: createTestEnhancement(1, "Test +1", ["test-numeric"]),
            },
        ];

        const hasGainedEnhancements = abilityCardHasGainedEnhancements(
            character.characterClass.abilityCards[0],
            character,
        );

        expect(hasGainedEnhancements).toEqual(true);
    });

    it("returns false when a card has not gained an enhancement", () => {
        const hasGainedEnhancements = abilityCardHasGainedEnhancements(
            character.characterClass.abilityCards[0],
            character,
        );

        expect(hasGainedEnhancements).toEqual(false);
    });
});

describe("convertEnhancementNameToKey", () => {
    interface NameKeyProperties {
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
    `("converts enhancement name $name to key $key", ({ name, key }: NameKeyProperties) => {
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
