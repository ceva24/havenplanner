import { getDefaultSettings, getSpoilerSettingsForCharacter } from "@/services/settings";
import { createTestCharacter, createTestItem, createTestSettings } from "@/test/create-test-fixtures";

const settings: Settings = createTestSettings();

describe("getDefaultSettings", () => {
    it("returns default settings", () => {
        const settings = getDefaultSettings();

        expect(settings.gameData.defaultCharacter.characterClass.id).toEqual(1);

        expect(settings.selectedAbilityCardsTabIndex).toEqual(0);
        expect(settings.showPersonalQuest).toEqual(false);

        expect(settings.spoilerSettings.items.prosperity).toEqual(1);
        expect(settings.spoilerSettings.items.itemGroups).toEqual([]);
    });
});

describe("spoilerSettingsForCharacter", () => {
    it("sets prosperity to 1 when the character has no items", () => {
        const character: Character = createTestCharacter();

        const spoilerSettings = getSpoilerSettingsForCharacter(character, settings.gameData);

        expect(spoilerSettings.items.prosperity).toEqual(1);
    });

    it("sets prosperity to 1 when the character has prosperity 1 items", () => {
        const character: Character = createTestCharacter({
            items: [{ id: "1", item: createTestItem(1, "Boots of Test", "1") }],
        });

        const spoilerSettings = getSpoilerSettingsForCharacter(character, settings.gameData);

        expect(spoilerSettings.items.prosperity).toEqual(1);
    });

    it("sets prosperity to the level of the highest prosperity item", () => {
        const character: Character = createTestCharacter({
            items: [
                { id: "1", item: createTestItem(1, "Boots of Test", "1") },
                { id: "2", item: createTestItem(1, "Boots of Test", "2") },
            ],
        });

        const spoilerSettings = getSpoilerSettingsForCharacter(character, settings.gameData);

        expect(spoilerSettings.items.prosperity).toEqual(2);
    });

    it("sets active item groups matching the character items", () => {
        const character: Character = createTestCharacter({
            items: [{ id: "1", item: createTestItem(1, "Boots of Test", "Test Random Item Designs") }],
        });

        const settingsWithItemGroups: Settings = createTestSettings();
        settingsWithItemGroups.gameData.itemGroups = [{ id: 1, name: "Test Random Item Designs" }];

        const spoilerSettings = getSpoilerSettingsForCharacter(character, settingsWithItemGroups.gameData);

        expect(spoilerSettings.items.itemGroups).toHaveLength(1);
        expect(spoilerSettings.items.itemGroups[0].name).toEqual("Test Random Item Designs");
    });

    it("ignores invalid item groups", () => {
        const item: Item = createTestItem(1, "Boots of Test", "Blep");

        const character: Character = createTestCharacter({
            items: [{ id: "1", item }],
        });

        const spoilerSettings = getSpoilerSettingsForCharacter(character, settings.gameData);

        expect(spoilerSettings.items.itemGroups).toHaveLength(0);
    });
});