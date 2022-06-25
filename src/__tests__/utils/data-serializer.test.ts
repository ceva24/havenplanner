import { serialize, deserialize } from "@/utils/data-serializer";
import { characterClasses, initialCharacter } from "@/utils/constants";

describe("data serializer", () => {
    it("serializes a character", () => {
        const character: Character = {
            name: "Test Character",
            experience: 240,
            gold: 75,
            notes: "It's a test",
            characterClass: characterClasses[2],
        };

        const data: string = serialize(character);

        expect(data).toEqual(`{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":2}`);
    });

    it("deserializes character data", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":2}`;

        const character: Character = deserialize(data);

        expect(character.name).toEqual("Test Character");
        expect(character.experience).toEqual(240);
        expect(character.gold).toEqual(75);
        expect(character.notes).toEqual("It's a test");
        expect(character.characterClass).toEqual(characterClasses[2]);
    });

    it("sets the default character class when the id is invalid", () => {
        const data = `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":-1}`;

        const character: Character = deserialize(data);

        expect(character.name).toEqual("Test Character");
        expect(character.experience).toEqual(240);
        expect(character.gold).toEqual(75);
        expect(character.notes).toEqual("It's a test");
        expect(character.characterClass).toEqual(initialCharacter.characterClass);
    });
});
