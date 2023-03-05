import { hasSpoilers, spoilerSettingsForCharacter } from "@/services/load";
import { createTestCharacter, createTestItem } from "@/test/create-test-fixtures";

describe("spoilerSettingsForCharacter", () => {
    it("sets prosperity to 1 when the character has no items", () => {
        const character: Character = createTestCharacter();

        const spoilerSettings = spoilerSettingsForCharacter(character);

        expect(spoilerSettings.items.prosperity).toEqual(1);
    });

    it("sets prosperity to 1 when the character has prosperity 1 items", () => {
        const character: Character = createTestCharacter({
            items: [{ id: "1", item: createTestItem(1, "Boots of Test", "1") }],
        });

        const spoilerSettings = spoilerSettingsForCharacter(character);

        expect(spoilerSettings.items.prosperity).toEqual(1);
    });

    it("sets prosperity to the level of the highest prosperity item", () => {
        const character: Character = createTestCharacter({
            items: [
                { id: "1", item: createTestItem(1, "Boots of Test", "1") },
                { id: "2", item: createTestItem(1, "Boots of Test", "2") },
            ],
        });

        const spoilerSettings = spoilerSettingsForCharacter(character);

        expect(spoilerSettings.items.prosperity).toEqual(2);
    });

    it("sets active item groups matching the character items", () => {
        const character: Character = createTestCharacter({
            items: [{ id: "1", item: createTestItem(1, "Boots of Test", "Random Item Designs") }],
        });

        const spoilerSettings = spoilerSettingsForCharacter(character);

        expect(spoilerSettings.items.itemGroups).toHaveLength(1);
        expect(spoilerSettings.items.itemGroups[0].name).toEqual("Random Item Designs");
    });

    it("ignores invalid item groups", () => {
        const item: Item = createTestItem(1, "Boots of Test", "Blep");

        const character: Character = createTestCharacter({
            items: [{ id: "1", item }],
        });

        const spoilerSettings = spoilerSettingsForCharacter(character);

        expect(spoilerSettings.items.itemGroups).toHaveLength(0);
    });
});

describe("hasSpoilers", () => {
    it("returns true when the character has items above prosperity level 1", () => {
        const character: Character = createTestCharacter({
            items: [{ id: "1", item: createTestItem(1, "Boots of Test", "2") }],
        });

        const result = hasSpoilers(character);

        expect(result).toEqual(true);
    });

    it("returns false when the character has items of prosperity level 1 only", () => {
        const character: Character = createTestCharacter({
            items: [{ id: "1", item: createTestItem(1, "Boots of Test", "1") }],
        });

        const result = hasSpoilers(character);

        expect(result).toEqual(false);
    });

    it("returns true when the character has items in an item group", () => {
        const item: Item = createTestItem(1, "Boots of Test", "Random Item Designs");

        const character: Character = createTestCharacter({
            items: [{ id: "1", item }],
        });

        const result = hasSpoilers(character);

        expect(result).toEqual(true);
    });
});
