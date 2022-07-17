import { serialize, deserialize } from "@/services/serializer";
import { characterClasses, defaultCharacter, items, personalQuests } from "@/utils/constants";

describe("data serializer", () => {
    it("serializes a character", () => {
        const character: Character = {
            name: "Test Character",
            experience: 240,
            gold: 75,
            notes: "It's a test",
            characterClass: characterClasses[2],
            personalQuest: personalQuests[8],
            items: [],
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
        };

        const data: string = serialize(character);

        expect(data).toEqual(`{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":2,"i":[2,2]}`);
    });

    it("deserializes character data", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":2,"p":518}`;

        const character: Character = deserialize(data);

        expect(character.name).toEqual("Test Character");
        expect(character.experience).toEqual(240);
        expect(character.gold).toEqual(75);
        expect(character.notes).toEqual("It's a test");
        expect(character.characterClass).toEqual(characterClasses[2]);
        expect(character.personalQuest).toEqual(personalQuests[8]);
    });

    it("sets the default character class when the id is invalid", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":-1}`;

        const character: Character = deserialize(data);

        expect(character.characterClass).toEqual(defaultCharacter.characterClass);
    });

    it("omits the personal quest property when deserializing a character with no personal quest id", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":0}`;

        const character: Character = deserialize(data);

        expect(character).not.toHaveProperty("personalQuest");
    });
});
