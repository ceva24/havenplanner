import { serialize } from "@/services/share/serializer";
import { createTestCharacter, createTestItem, createTestSettings } from "@/test/create-test-fixtures";

const settings: Settings = createTestSettings();

describe("serializer", () => {
    it("omits the personal quest property when serializing a character with no personal quest id", () => {
        const character: Character = createTestCharacter();

        const data: string = serialize(character, settings.gameData);

        expect(data).not.toMatch(/"q":/);
    });

    it("serializes duplicate items", () => {
        const item: Item = createTestItem(1, "Boots of Test", "1");
        const settings: Settings = createTestSettings();
        settings.gameData.items = [item];

        const character: Character = createTestCharacter();
        character.items = [
            { id: "1", item },
            { id: "2", item },
        ];

        const data: string = serialize(character, settings.gameData);

        expect(data).toMatch(/"i":\[1,1]/);
    });
});
