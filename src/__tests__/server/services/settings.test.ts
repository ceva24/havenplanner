import { getDefaultSettings, getSpoilerSettingsForCharacter } from "@/server/services/settings";
import {
    createTestCharacter,
    createTestCharacterClass,
    createTestItem,
    createTestSettings,
} from "@/test/create-test-fixtures";

const settings: Settings = createTestSettings();

describe("getDefaultSettings", () => {
    it("returns default settings", () => {
        const settings = getDefaultSettings();

        expect(settings.gameData.defaultCharacter.characterClass.id).toEqual(1);

        expect(settings.userSettings.showPersonalQuest).toEqual(false);
        expect(settings.userSettings.selectedAbilityCardsTabIndex).toEqual(0);
        expect(settings.userSettings.filteredItemSlots).toEqual([]);

        expect(settings.spoilerSettings.classes).toEqual([]);
        expect(settings.spoilerSettings.items.prosperity).toEqual(1);
        expect(settings.spoilerSettings.items.itemGroups).toEqual([]);
    });
});

describe("getSpoilerSettingsForCharacter", () => {
    it("sets prosperity to 1 when the character has no items", () => {
        const character: Character = createTestCharacter();

        const spoilerSettings = getSpoilerSettingsForCharacter(character, settings.gameData);

        expect(spoilerSettings.items.prosperity).toEqual(1);
    });

    it("sets prosperity to 1 when the character has prosperity 1 items", () => {
        const character: Character = createTestCharacter({
            items: [{ id: "1", item: createTestItem(1, "Boots of Test", "1"), showAlternativeImage: false }],
        });

        const spoilerSettings = getSpoilerSettingsForCharacter(character, settings.gameData);

        expect(spoilerSettings.items.prosperity).toEqual(1);
    });

    it("sets prosperity to the level of the highest prosperity item", () => {
        const character: Character = createTestCharacter({
            items: [
                { id: "1", item: createTestItem(1, "Boots of Test", "1"), showAlternativeImage: false },
                { id: "2", item: createTestItem(1, "Boots of Test", "2"), showAlternativeImage: false },
            ],
        });

        const spoilerSettings = getSpoilerSettingsForCharacter(character, settings.gameData);

        expect(spoilerSettings.items.prosperity).toEqual(2);
    });

    it("sets the prosperity to 1 when the character has item group items", () => {
        const character: Character = createTestCharacter({
            items: [{ id: "1", item: createTestItem(1, "Boots of Test", "Test Items"), showAlternativeImage: false }],
        });

        const spoilerSettings = getSpoilerSettingsForCharacter(character, settings.gameData);

        expect(spoilerSettings.items.prosperity).toEqual(1);
    });

    it("sets active item groups matching the character items", () => {
        const character: Character = createTestCharacter({
            items: [
                {
                    id: "1",
                    item: createTestItem(1, "Boots of Test", "Test Random Item Designs"),
                    showAlternativeImage: false,
                },
            ],
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
            items: [{ id: "1", item, showAlternativeImage: false }],
        });

        const spoilerSettings = getSpoilerSettingsForCharacter(character, settings.gameData);

        expect(spoilerSettings.items.itemGroups).toHaveLength(0);
    });

    it("sets the classes to be empty if the current character class is a starter class", () => {
        const character: Character = createTestCharacter();

        const spoilerSettings = getSpoilerSettingsForCharacter(character, settings.gameData);

        expect(spoilerSettings.classes).toHaveLength(0);
    });

    it("sets the classes to include the current character class if it is initially locked", () => {
        const characterClass: CharacterClass = createTestCharacterClass(2, "Test Spoiler");
        characterClass.initiallyLocked = true;

        const character: Character = createTestCharacter({
            characterClass,
        });

        const spoilerSettings = getSpoilerSettingsForCharacter(character, settings.gameData);

        expect(spoilerSettings.classes).toHaveLength(1);
        expect(spoilerSettings.classes[0].id).toEqual(2);
    });
});
