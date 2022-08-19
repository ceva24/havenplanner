import { serialize, deserialize } from "@/services/serializer";
import { characterClasses, defaultCharacter, items, personalQuests } from "@/utils/constants";

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
        const character: Character = {
            name: "Test Character",
            experience: 240,
            gold: 75,
            notes: "It's a test",
            characterClass: characterClasses[2],
            personalQuest: personalQuests[8],
            items: [],
            unlockedAbilityCards: [],
        };

        const data: string = serialize(character);

        expect(data).toEqual(`{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":2,"p":518,"i":[]}`);
    });

    it("omits the personal quest property when serializing a character with no personal quest id", () => {
        const character: Character = {
            name: "Test Character",
            experience: 240,
            gold: 75,
            notes: "It's a test",
            characterClass: characterClasses[2],
            personalQuest: undefined,
            items: [],
            unlockedAbilityCards: [],
        };

        const data: string = serialize(character);

        expect(data).toEqual(`{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":2,"i":[]}`);
    });

    it("serializes item data", () => {
        const character: Character = {
            name: "Test Character",
            experience: 240,
            gold: 75,
            notes: "It's a test",
            characterClass: characterClasses[2],
            personalQuest: undefined,
            items: [
                { id: "1", item: items[1] },
                { id: "2", item: items[7] },
            ],
            unlockedAbilityCards: [],
        };

        const data: string = serialize(character);

        expect(data).toEqual(`{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":2,"i":[2,8]}`);
    });

    it("serializes duplicate items", () => {
        const character: Character = {
            name: "Test Character",
            experience: 240,
            gold: 75,
            notes: "It's a test",
            characterClass: characterClasses[2],
            personalQuest: undefined,
            items: [
                { id: "1", item: items[1] },
                { id: "2", item: items[1] },
            ],
            unlockedAbilityCards: [],
        };

        const data: string = serialize(character);

        expect(data).toEqual(`{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":2,"i":[2,2]}`);
    });
});

describe("deserialize", () => {
    it("deserializes character data", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":2,"p":518,"i":[]}`;

        const character: Character = deserialize(data);

        expect(character.name).toEqual("Test Character");
        expect(character.experience).toEqual(240);
        expect(character.gold).toEqual(75);
        expect(character.notes).toEqual("It's a test");
        expect(character.characterClass).toEqual(characterClasses[2]);
        expect(character.personalQuest).toEqual(personalQuests[8]);
    });

    it("deserializes item data", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":2,"i":[2,8]}`;

        const character: Character = deserialize(data);

        expect(character.items).toHaveLength(2);
        expect(character.items[0].item).toEqual(items[1]);
        expect(character.items[1].item).toEqual(items[7]);
    });

    it("sets new uuids on character items", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":2,"i":[2,8]}`;

        const character: Character = deserialize(data);

        expect(character.items).toHaveLength(2);
        expect(character.items[0].id).toEqual("123");
        expect(character.items[1].id).toEqual("123");
    });

    it("omits item data that is invalid", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":2,"i":[2,-1]}`;

        const character: Character = deserialize(data);

        expect(character.items).toHaveLength(1);
        expect(character.items[0].item).toEqual(items[1]);
    });

    it("sets the default character class when the id is invalid", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":-1,"i":[]}`;

        const character: Character = deserialize(data);

        expect(character.characterClass).toEqual(defaultCharacter.characterClass);
    });

    it("omits the personal quest property when deserializing a character with no personal quest id", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":0,"i":[]}`;

        const character: Character = deserialize(data);

        expect(character).not.toHaveProperty("personalQuest");
    });
});
