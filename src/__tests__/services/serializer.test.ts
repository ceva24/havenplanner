import { deserialize, serialize } from "@/services/serializer";
import { characterClasses } from "@/loaders/character-classes";
import { items } from "@/loaders/items";
import { personalQuests } from "@/loaders/personal-quests";
import { defaultCharacter } from "@/constants";
import { createTestCharacter } from "@/testutils";

jest.mock("uuid", () => {
    return {
        v4: jest.fn().mockReturnValue("123"),
    };
});

beforeEach(() => {
    jest.clearAllMocks();
});

describe("serialize", () => {
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
            `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"q":518,"i":[],"u":[],"h":[],"p":[]}`
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
            `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[],"u":[],"h":[],"p":[]}`
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
            `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[2,8],"u":[],"h":[],"p":[]}`
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
            `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[2,2],"u":[],"h":[],"p":[]}`
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
            `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[],"u":[61],"h":[],"p":[]}`
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
            `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[],"u":[],"h":[61],"p":[]}`
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
            `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[],"u":[],"h":[],"p":[[0,0],[1,1]]}`
        );
    });
});

describe("deserialize", () => {
    it("deserializes character data", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"q":518,"i":[],"u":[],"h":[],"p":[]}`;

        const character: Character = deserialize(data);

        expect(character.name).toEqual("Test Character");
        expect(character.experience).toEqual(240);
        expect(character.gold).toEqual(75);
        expect(character.notes).toEqual("It's a test");
        expect(character.characterClass).toEqual(characterClasses[2]);
        expect(character.personalQuest).toEqual(personalQuests[8]);
    });

    it("deserializes item data", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[2,8],"u":[],"h":[],"p":[]}`;

        const character: Character = deserialize(data);

        expect(character.items).toHaveLength(2);
        expect(character.items[0].item).toEqual(items[1]);
        expect(character.items[1].item).toEqual(items[7]);
    });

    it("sets new uuids on character items", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[2,8],"u":[],"h":[],"p":[]}`;

        const character: Character = deserialize(data);

        expect(character.items).toHaveLength(2);
        expect(character.items[0].id).toEqual("123");
        expect(character.items[1].id).toEqual("123");
    });

    it("omits item data that is invalid", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[2,-1],"u":[],"h":[],"p":[]}`;

        const character: Character = deserialize(data);

        expect(character.items).toHaveLength(1);
        expect(character.items[0].item).toEqual(items[1]);
    });

    it("sets the default character class when the id is invalid", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":-1,"i":[],"u":[],"h":[],"p":[]}`;

        const character: Character = deserialize(data);

        expect(character.characterClass).toEqual(defaultCharacter.characterClass);
    });

    it("omits the personal quest property when deserializing a character with no personal quest id", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":1,"i":[],"u":[],"h":[],"p":[]}`;

        const character: Character = deserialize(data);

        expect(character).not.toHaveProperty("personalQuest");
    });

    it("deserializes unlocked ability card data", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[],"u":[73,74],"h":[],"p":[]}`;

        const character: Character = deserialize(data);

        expect(character.unlockedAbilityCards).toHaveLength(2);
        expect(character.unlockedAbilityCards[0]).toEqual(characterClasses[2].abilityCards[12]);
        expect(character.unlockedAbilityCards[1]).toEqual(characterClasses[2].abilityCards[13]);
    });

    it("omits unlocked ability card that is invalid", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[],"u":[73,15,-2],"h":[],"p":[]}`;

        const character: Character = deserialize(data);

        expect(character.unlockedAbilityCards).toHaveLength(1);
        expect(character.unlockedAbilityCards[0]).toEqual(characterClasses[2].abilityCards[12]);
    });

    it("deserializes hand data", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[],"u":[],"h":[73,74],"p":[]}`;

        const character: Character = deserialize(data);

        expect(character.hand).toHaveLength(2);
        expect(character.hand[0]).toEqual(characterClasses[2].abilityCards[12]);
        expect(character.hand[1]).toEqual(characterClasses[2].abilityCards[13]);
    });

    it("omits hand that is invalid", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[],"u":[],"h":[73,15,-2],"p":[]}`;

        const character: Character = deserialize(data);

        expect(character.hand).toHaveLength(1);
        expect(character.hand[0]).toEqual(characterClasses[2].abilityCards[12]);
    });

    it("deserializes gained perk data", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[],"u":[],"h":[],"p":[[0,0],[1,1]]}`;

        const character: Character = deserialize(data);

        expect(character.gainedPerks).toHaveLength(2);
        expect(character.gainedPerks[0]).toEqual({ perk: character.characterClass.perks[0], checkboxIndex: 0 });
        expect(character.gainedPerks[1]).toEqual({ perk: character.characterClass.perks[1], checkboxIndex: 1 });
    });
});
