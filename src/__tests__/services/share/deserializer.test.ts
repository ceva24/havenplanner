import { deserialize } from "@/services/share/deserializer";
import { createTestItem, createTestSettings } from "@/test/create-test-fixtures";

jest.mock("uuid", () => {
    return {
        v4: jest.fn().mockReturnValue("123"),
    };
});

const settings: Settings = createTestSettings();

describe("deserialize", () => {
    it("sets new uuids on character items", () => {
        const settings: Settings = createTestSettings();
        settings.gameData.items = [createTestItem(2, "Boots of Test", "1"), createTestItem(8, "Cloak of Test", "1")];

        const data = JSON.parse(
            `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[2,8],"u":[],"h":[],"e":[],"p":[],"b":[]}`
        ) as SerializedCharacter;

        const character: Character = deserialize(data, settings.gameData);

        expect(character.items).toHaveLength(2);
        expect(character.items[0].id).toEqual("123");
        expect(character.items[1].id).toEqual("123");
    });

    it("omits item data that is invalid", () => {
        const data = JSON.parse(
            `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[-1],"u":[],"h":[],"e":[],"p":[],"b":[]}`
        ) as SerializedCharacter;

        const character: Character = deserialize(data, settings.gameData);

        expect(character.items).toHaveLength(0);
    });

    it("sets the default character class when the id is invalid", () => {
        const data = JSON.parse(
            `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":-1,"i":[],"u":[],"h":[],"e":[],"p":[],"b":[]}`
        ) as SerializedCharacter;

        const character: Character = deserialize(data, settings.gameData);

        expect(character.characterClass.name).toEqual("Test Brute");
    });

    it("omits the personal quest property when deserializing a character with no personal quest id", () => {
        const data = JSON.parse(
            `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":1,"i":[],"u":[],"h":[],"e":[],"p":[],"b":[]}`
        ) as SerializedCharacter;

        const character: Character = deserialize(data, settings.gameData);

        expect(character).not.toHaveProperty("personalQuest");
    });

    it("omits unlocked ability card that is invalid", () => {
        const data = JSON.parse(
            `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[],"u":[-2],"h":[],"e":[],"p":[],"b":[]}`
        ) as SerializedCharacter;

        const character: Character = deserialize(data, settings.gameData);

        expect(character.unlockedAbilityCards).toHaveLength(0);
    });

    it("omits hand data that is invalid", () => {
        const data = JSON.parse(
            `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[],"u":[],"h":[-2],"e":[],"p":[],"b":[]}`
        ) as SerializedCharacter;

        const character: Character = deserialize(data, settings.gameData);

        expect(character.hand).toHaveLength(0);
    });
});
