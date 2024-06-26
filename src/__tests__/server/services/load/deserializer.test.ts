import { deserialize } from "@/server/services/load/deserializer";
import { createTestCharacterClass, createTestItem, createTestSettings } from "@/test/create-test-fixtures";

jest.mock("uuid", () => {
    return {
        v4: jest.fn().mockReturnValue("123"),
    };
});

const settings: Settings = createTestSettings();

const classes: CharacterClass[] = [createTestCharacterClass(3, "Test Brute")];

describe("deserialize", () => {
    it("sets new uuids on character items", () => {
        const settings: Settings = createTestSettings();
        const items: Item[] = [createTestItem(2, "Boots of Test", "1"), createTestItem(8, "Cloak of Test", "1")];

        const data = JSON.parse(
            `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[[2,false],[8,false]],"u":[],"h":[],"e":[],"p":[],"b":[]}`,
        ) as SerializedCharacter;

        const character: Character = deserialize(data, settings.gameData, classes, items);

        expect(character.items).toHaveLength(2);
        expect(character.items[0].id).toEqual("123");
        expect(character.items[1].id).toEqual("123");
    });

    it("omits item data that is invalid", () => {
        const data = JSON.parse(
            `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[[-1,false]],"u":[],"h":[],"e":[],"p":[],"b":[]}`,
        ) as SerializedCharacter;

        const character: Character = deserialize(data, settings.gameData, classes, []);

        expect(character.items).toHaveLength(0);
    });

    it("sets the default character class when the id is invalid", () => {
        const data = JSON.parse(
            `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":-1,"i":[],"u":[],"h":[],"e":[],"p":[],"b":[]}`,
        ) as SerializedCharacter;

        const character: Character = deserialize(data, settings.gameData, classes, []);

        expect(character.characterClass.name).toEqual("Test Brute");
    });

    it("omits the personal quest property when deserializing a character with no personal quest id", () => {
        const data = JSON.parse(
            `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":1,"i":[],"u":[],"h":[],"e":[],"p":[],"b":[]}`,
        ) as SerializedCharacter;

        const character: Character = deserialize(data, settings.gameData, classes, []);

        expect(character).not.toHaveProperty("personalQuest");
    });

    it("omits unlocked ability card that is invalid", () => {
        const data = JSON.parse(
            `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[],"u":[-2],"h":[],"e":[],"p":[],"b":[]}`,
        ) as SerializedCharacter;

        const character: Character = deserialize(data, settings.gameData, classes, []);

        expect(character.unlockedAbilityCards).toHaveLength(0);
    });

    it("omits hand data that is invalid", () => {
        const data = JSON.parse(
            `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[],"u":[],"h":[-2],"e":[],"p":[],"b":[]}`,
        ) as SerializedCharacter;

        const character: Character = deserialize(data, settings.gameData, classes, []);

        expect(character.hand).toHaveLength(0);
    });

    it("deserializes perks with non-zero indexed ids", () => {
        const characterClass: CharacterClass = createTestCharacterClass(3, "Test Brute");
        characterClass.perks = [
            {
                id: 1,
                name: "Remove two <-1> cards",
                count: 1,
                add: [],
                remove: [],
            },
            {
                id: 3,
                name: "Add two <+1> cards",
                count: 1,
                add: [],
                remove: [],
            },
        ];

        const settings: Settings = createTestSettings();

        const data = JSON.parse(
            `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[],"u":[],"h":[],"e":[],"p":[[1,0],[3,0]],"b":[]}`,
        ) as SerializedCharacter;

        const character: Character = deserialize(data, settings.gameData, [characterClass], []);

        expect(character.gainedPerks).toHaveLength(2);

        expect(character.gainedPerks[0].perk).toBeTruthy();
        expect(character.gainedPerks[1].perk).toBeTruthy();
    });

    it("omits gained perk data that is invalid", () => {
        const data = JSON.parse(
            `{"n":"Test Character","x":240,"g":75,"d":"It's a test","c":3,"i":[],"u":[],"h":[],"e":[],"p":[[-1, 0]],"b":[]}`,
        ) as SerializedCharacter;

        const character: Character = deserialize(data, settings.gameData, classes, []);

        expect(character.gainedPerks).toHaveLength(0);
    });
});
