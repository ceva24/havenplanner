import { serialize } from "@/client/services/share/serializer";
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

        const character: Character = createTestCharacter();
        character.items = [
            { id: "1", item, showAlternativeImage: false },
            { id: "2", item, showAlternativeImage: false },
        ];

        const data: string = serialize(character, settings.gameData);

        expect(data).toMatch(/"i":\[\[1,false],\[1,false]]/);
    });
});
