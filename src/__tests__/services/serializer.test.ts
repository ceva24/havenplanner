import { serialize, deserialize } from "@/services/serializer";
import { characterClasses } from "@/loaders/character-classes";
import { items } from "@/loaders/items";
import { personalQuests } from "@/loaders/personal-quests";
import { defaultCharacter } from "@/utils/constants";
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

        expect(data).toEqual(`{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"p":518,"i":[],"u":[]}`);
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

        expect(data).toEqual(`{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[],"u":[]}`);
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

        expect(data).toEqual(`{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[2,8],"u":[]}`);
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

        expect(data).toEqual(`{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[2,2],"u":[]}`);
    });
});

describe("deserialize", () => {
    it("deserializes character data", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"p":518,"i":[],"u":[]}`;

        const character: Character = deserialize(data);

        expect(character.name).toEqual("Test Character");
        expect(character.experience).toEqual(240);
        expect(character.gold).toEqual(75);
        expect(character.notes).toEqual("It's a test");
        expect(character.characterClass).toEqual(characterClasses[2]);
        expect(character.personalQuest).toEqual(personalQuests[8]);
    });

    it("deserializes item data", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[2,8],"u":[]}`;

        const character: Character = deserialize(data);

        expect(character.items).toHaveLength(2);
        expect(character.items[0].item).toEqual(items[1]);
        expect(character.items[1].item).toEqual(items[7]);
    });

    it("sets new uuids on character items", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[2,8],"u":[]}`;

        const character: Character = deserialize(data);

        expect(character.items).toHaveLength(2);
        expect(character.items[0].id).toEqual("123");
        expect(character.items[1].id).toEqual("123");
    });

    it("omits item data that is invalid", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[2,-1],"u":[]}`;

        const character: Character = deserialize(data);

        expect(character.items).toHaveLength(1);
        expect(character.items[0].item).toEqual(items[1]);
    });

    it("sets the default character class when the id is invalid", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":-1,"i":[],"u":[]}`;

        const character: Character = deserialize(data);

        expect(character.characterClass).toEqual(defaultCharacter.characterClass);
    });

    it("omits the personal quest property when deserializing a character with no personal quest id", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":1,"i":[],"u":[]}`;

        const character: Character = deserialize(data);

        expect(character).not.toHaveProperty("personalQuest");
    });

    it("deserializes ability card data", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[],"u":[73,74]}`;

        const character: Character = deserialize(data);

        expect(character.unlockedAbilityCards).toHaveLength(2);
        expect(character.unlockedAbilityCards[0]).toEqual(characterClasses[2].abilityCards[12]);
        expect(character.unlockedAbilityCards[1]).toEqual(characterClasses[2].abilityCards[13]);
    });

    it("omits ability card that is invalid", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[],"u":[73,15,-2]}`;

        const character: Character = deserialize(data);

        expect(character.unlockedAbilityCards).toHaveLength(1);
        expect(character.unlockedAbilityCards[0]).toEqual(characterClasses[2].abilityCards[12]);
    });
});
