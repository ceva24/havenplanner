import { serialize } from "@/services/serializer";
import { characterClasses } from "@/loaders/character-classes";
import { prosperityOneItems } from "@/loaders/items";
import { personalQuests } from "@/loaders/personal-quests";
import { enhancements } from "@/loaders/enhancements";
import { createTestCharacter } from "@/testutils";

describe("serializer", () => {
    it("serializes a character", () => {
        const character: Character = createTestCharacter({
            name: "Test Character",
            experience: 240,
            gold: 75,
            notes: "It's a test",
            characterClass: characterClasses[2],
            personalQuest: personalQuests[8],
            battleGoalCheckmarkGroups: [],
        });

        const data: string = serialize(character);

        expect(data).toEqual(
            `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"q":518,"i":[],"u":[],"h":[],"e":[],"p":[],"b":[]}`
        );
    });

    it("omits the personal quest property when serializing a character with no personal quest id", () => {
        const character: Character = createTestCharacter({
            name: "Test Character",
            experience: 240,
            gold: 75,
            notes: "It's a test",
            characterClass: characterClasses[2],
            battleGoalCheckmarkGroups: [],
        });

        const data: string = serialize(character);

        expect(data).toEqual(
            `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[],"u":[],"h":[],"e":[],"p":[],"b":[]}`
        );
    });

    it("serializes item data", () => {
        const character: Character = createTestCharacter({
            name: "Test Character",
            experience: 240,
            gold: 75,
            notes: "It's a test",
            characterClass: characterClasses[2],
            battleGoalCheckmarkGroups: [],
            items: [
                { id: "1", item: prosperityOneItems[1] },
                { id: "2", item: prosperityOneItems[7] },
            ],
        });

        const data: string = serialize(character);

        expect(data).toEqual(
            `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[2,8],"u":[],"h":[],"e":[],"p":[],"b":[]}`
        );
    });

    it("serializes duplicate items", () => {
        const character: Character = createTestCharacter({
            name: "Test Character",
            experience: 240,
            gold: 75,
            notes: "It's a test",
            characterClass: characterClasses[2],
            battleGoalCheckmarkGroups: [],
            items: [
                { id: "1", item: prosperityOneItems[1] },
                { id: "2", item: prosperityOneItems[1] },
            ],
            unlockedAbilityCards: [],
        });

        const data: string = serialize(character);

        expect(data).toEqual(
            `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[2,2],"u":[],"h":[],"e":[],"p":[],"b":[]}`
        );
    });

    it("serializes unlocked ability cards", () => {
        const character: Character = createTestCharacter({
            name: "Test Character",
            experience: 240,
            gold: 75,
            notes: "It's a test",
            characterClass: characterClasses[2],
            battleGoalCheckmarkGroups: [],
        });
        character.unlockedAbilityCards = [character.characterClass.abilityCards[0]];

        const data: string = serialize(character);

        expect(data).toEqual(
            `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[],"u":[61],"h":[],"e":[],"p":[],"b":[]}`
        );
    });

    it("serializes the hand", () => {
        const character: Character = createTestCharacter({
            name: "Test Character",
            experience: 240,
            gold: 75,
            notes: "It's a test",
            characterClass: characterClasses[2],
            battleGoalCheckmarkGroups: [],
        });
        character.hand = [character.characterClass.abilityCards[0]];

        const data: string = serialize(character);

        expect(data).toEqual(
            `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[],"u":[],"h":[61],"e":[],"p":[],"b":[]}`
        );
    });

    it("serializes gained enhancements", () => {
        const character: Character = createTestCharacter({
            name: "Test Character",
            experience: 240,
            gold: 75,
            notes: "It's a test",
            characterClass: characterClasses[2],
            battleGoalCheckmarkGroups: [],
        });
        character.gainedEnhancements = [
            {
                abilityCard: character.characterClass.abilityCards[0],
                enhancementSlot: character.characterClass.abilityCards[0].enhancementSlots[0],
                enhancement: enhancements[1],
            },
            {
                abilityCard: character.characterClass.abilityCards[1],
                enhancementSlot: character.characterClass.abilityCards[1].enhancementSlots[1],
                enhancement: enhancements[0],
            },
        ];

        const data: string = serialize(character);

        expect(data).toEqual(
            `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[],"u":[],"h":[],"e":[[61,0,1],[62,1,0]],"p":[],"b":[]}`
        );
    });

    it("serializes gained perks", () => {
        const character: Character = createTestCharacter({
            name: "Test Character",
            experience: 240,
            gold: 75,
            notes: "It's a test",
            characterClass: characterClasses[2],
            battleGoalCheckmarkGroups: [],
        });
        character.gainedPerks = [
            { perk: character.characterClass.perks[0], checkboxIndex: 0 },
            { perk: character.characterClass.perks[1], checkboxIndex: 1 },
        ];

        const data: string = serialize(character);

        expect(data).toEqual(
            `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[],"u":[],"h":[],"e":[],"p":[[0,0],[1,1]],"b":[]}`
        );
    });

    it("serializes battle goal progress", () => {
        const character: Character = createTestCharacter({
            name: "Test Character",
            experience: 240,
            gold: 75,
            notes: "It's a test",
            characterClass: characterClasses[2],
            battleGoalCheckmarkGroups: [
                {
                    id: 0,
                    checkmarks: [
                        { id: 0, value: true },
                        { id: 1, value: true },
                        { id: 2, value: true },
                    ],
                },
                {
                    id: 1,
                    checkmarks: [
                        { id: 0, value: true },
                        { id: 1, value: false },
                        { id: 2, value: false },
                    ],
                },
            ],
        });

        const data: string = serialize(character);

        expect(data).toEqual(
            `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[],"u":[],"h":[],"e":[],"p":[],"b":[[true,true,true],[true,false,false]]}`
        );
    });
});
