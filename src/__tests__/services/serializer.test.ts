import { serialize } from "@/services/serializer";
import { characterClasses } from "@/loaders/character-classes";
import { items } from "@/loaders/items";
import { personalQuests } from "@/loaders/personal-quests";
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
        });

        const data: string = serialize(character);

        expect(data).toEqual(
            `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"q":518,"i":[],"u":[],"h":[],"p":[],"b":[]}`
        );
    });

    it("omits the personal quest property when serializing a character with no personal quest id", () => {
        const character: Character = createTestCharacter({
            name: "Test Character",
            experience: 240,
            gold: 75,
            notes: "It's a test",
            characterClass: characterClasses[2],
        });

        const data: string = serialize(character);

        expect(data).toEqual(
            `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[],"u":[],"h":[],"p":[],"b":[]}`
        );
    });

    it("serializes item data", () => {
        const character: Character = createTestCharacter({
            name: "Test Character",
            experience: 240,
            gold: 75,
            notes: "It's a test",
            characterClass: characterClasses[2],
            items: [
                { id: "1", item: items[1] },
                { id: "2", item: items[7] },
            ],
        });

        const data: string = serialize(character);

        expect(data).toEqual(
            `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[2,8],"u":[],"h":[],"p":[],"b":[]}`
        );
    });

    it("serializes duplicate items", () => {
        const character: Character = createTestCharacter({
            name: "Test Character",
            experience: 240,
            gold: 75,
            notes: "It's a test",
            characterClass: characterClasses[2],
            items: [
                { id: "1", item: items[1] },
                { id: "2", item: items[1] },
            ],
            unlockedAbilityCards: [],
        });

        const data: string = serialize(character);

        expect(data).toEqual(
            `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[2,2],"u":[],"h":[],"p":[],"b":[]}`
        );
    });

    it("serializes unlocked ability cards", () => {
        const character: Character = createTestCharacter({
            name: "Test Character",
            experience: 240,
            gold: 75,
            notes: "It's a test",
            characterClass: characterClasses[2],
        });
        character.unlockedAbilityCards = [character.characterClass.abilityCards[0]];

        const data: string = serialize(character);

        expect(data).toEqual(
            `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[],"u":[61],"h":[],"p":[],"b":[]}`
        );
    });

    it("serializes the hand", () => {
        const character: Character = createTestCharacter({
            name: "Test Character",
            experience: 240,
            gold: 75,
            notes: "It's a test",
            characterClass: characterClasses[2],
        });
        character.hand = [character.characterClass.abilityCards[0]];

        const data: string = serialize(character);

        expect(data).toEqual(
            `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[],"u":[],"h":[61],"p":[],"b":[]}`
        );
    });

    it("serializes gained perks", () => {
        const character: Character = createTestCharacter({
            name: "Test Character",
            experience: 240,
            gold: 75,
            notes: "It's a test",
            characterClass: characterClasses[2],
        });
        character.gainedPerks = [
            { perk: character.characterClass.perks[0], checkboxIndex: 0 },
            { perk: character.characterClass.perks[1], checkboxIndex: 1 },
        ];

        const data: string = serialize(character);

        expect(data).toEqual(
            `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[],"u":[],"h":[],"p":[[0,0],[1,1]],"b":[]}`
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
            `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[],"u":[],"h":[],"p":[],"b":[[true,true,true],[true,false,false]]}`
        );
    });
});
