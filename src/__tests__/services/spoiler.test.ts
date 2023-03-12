import {
    characterClassIsUnlocked,
    hasCharacterSpoilers,
    hasItemSpoilers,
    hasSpoilers,
    isCompletelySpoiled,
    itemGroupIsActive,
} from "@/services/spoiler";
import {
    createTestCharacter,
    createTestCharacterClass,
    createTestItem,
    createTestSettings,
} from "@/test/create-test-fixtures";

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

    it("returns true when the character has an initially locked class", () => {
        const character: Character = createTestCharacter();
        character.characterClass.initiallyLocked = true;

        const result = hasSpoilers(character);

        expect(result).toEqual(true);
    });
});

describe("characterClassIsUnlocked", () => {
    it("returns true when the character class is unlocked in the settings", () => {
        const summary: UnlockableCharacterClassSummary = { id: 2, imageUrl: "", spoilerSafeName: "Test Spoilery" };

        const settings: Settings = createTestSettings();
        settings.spoilerSettings.classes = [summary];

        const isUnlocked = characterClassIsUnlocked(summary, settings);

        expect(isUnlocked).toEqual(true);
    });

    it("returns false when the character class is not unlocked in the settings", () => {
        const summary: UnlockableCharacterClassSummary = { id: 2, imageUrl: "", spoilerSafeName: "Test Spoilery" };

        const settings: Settings = createTestSettings();

        const isUnlocked = characterClassIsUnlocked(summary, settings);

        expect(isUnlocked).toEqual(false);
    });
});

describe("itemGroupIsActive", () => {
    it("returns true when the item group is active in the settings", () => {
        const itemGroup = { id: 0, name: "Group" };

        const settings: Settings = createTestSettings();
        settings.spoilerSettings.items.itemGroups = [itemGroup];

        const isActive = itemGroupIsActive(itemGroup, settings);

        expect(isActive).toEqual(true);
    });

    it("returns false when the item group is inactive in the settings", () => {
        const itemGroup = { id: 0, name: "Group" };

        const settings: Settings = createTestSettings();

        const isActive = itemGroupIsActive(itemGroup, settings);

        expect(isActive).toEqual(false);
    });
});

describe("isCompletelySpoiled", () => {
    it("returns false when prosperity is < 9 and item groups are unchecked", () => {
        const settings: Settings = createTestSettings({
            spoilerSettings: {
                classes: [],
                items: {
                    prosperity: 1,
                    itemGroups: [],
                },
            },
        });

        const isSpoiled = isCompletelySpoiled(settings);

        expect(isSpoiled).toEqual(false);
    });

    it("returns false when prosperity is 9 and item groups are unchecked", () => {
        const settings: Settings = createTestSettings({
            spoilerSettings: {
                classes: [],
                items: {
                    prosperity: 9,
                    itemGroups: [],
                },
            },
        });

        const isSpoiled = isCompletelySpoiled(settings);

        expect(isSpoiled).toEqual(false);
    });

    it("returns false when prosperity is < 9 and all item groups are checked", () => {
        const settings: Settings = createTestSettings();
        settings.spoilerSettings.items.itemGroups = settings.gameData.itemGroups;

        const isSpoiled = isCompletelySpoiled(settings);

        expect(isSpoiled).toEqual(false);
    });

    it("returns true when prosperity is 9 and all item groups are checked", () => {
        const settings: Settings = createTestSettings();
        settings.spoilerSettings = {
            classes: [],
            items: {
                prosperity: 9,
                itemGroups: settings.gameData.itemGroups,
            },
        };

        const isSpoiled = isCompletelySpoiled(settings);

        expect(isSpoiled).toEqual(true);
    });

    it("returns false when all item settings are spoiled and no characters are", () => {
        const characterClass: CharacterClass = createTestCharacterClass(2, "Test Spoiler");
        characterClass.initiallyLocked = true;

        const summary: UnlockableCharacterClassSummary = { id: 2, imageUrl: "", spoilerSafeName: "Test Spoilery" };

        const settings: Settings = createTestSettings();
        settings.gameData.characterClasses.push(characterClass);
        settings.gameData.unlockableCharacterClasses = [summary];

        settings.spoilerSettings = {
            classes: [],
            items: {
                prosperity: 9,
                itemGroups: settings.gameData.itemGroups,
            },
        };

        const isSpoiled = isCompletelySpoiled(settings);

        expect(isSpoiled).toEqual(false);
    });

    it("returns false when some item settings are spoiled and all characters are", () => {
        const characterClass: CharacterClass = createTestCharacterClass(2, "Test Spoiler");
        characterClass.initiallyLocked = true;

        const summary: UnlockableCharacterClassSummary = { id: 2, imageUrl: "", spoilerSafeName: "Test Spoilery" };

        const settings: Settings = createTestSettings();
        settings.gameData.characterClasses.push(characterClass);
        settings.gameData.unlockableCharacterClasses = [summary];

        settings.spoilerSettings = {
            classes: [summary],
            items: {
                prosperity: 9,
                itemGroups: [],
            },
        };

        const isSpoiled = isCompletelySpoiled(settings);

        expect(isSpoiled).toEqual(false);
    });

    it("returns true when all item settings are spoiled and all characters are", () => {
        const characterClass: CharacterClass = createTestCharacterClass(2, "Test Spoiler");
        characterClass.initiallyLocked = true;

        const summary: UnlockableCharacterClassSummary = { id: 2, imageUrl: "", spoilerSafeName: "Test Spoilery" };

        const settings: Settings = createTestSettings();
        settings.gameData.characterClasses.push(characterClass);
        settings.gameData.unlockableCharacterClasses = [summary];

        settings.spoilerSettings = {
            classes: [summary],
            items: {
                prosperity: 9,
                itemGroups: settings.gameData.itemGroups,
            },
        };

        const isSpoiled = isCompletelySpoiled(settings);

        expect(isSpoiled).toEqual(true);
    });
});

describe("hasCharacterSpoilers", () => {
    it("returns false when there are no unlocked classes", () => {
        const settings: Settings = createTestSettings();
        settings.spoilerSettings.classes = [];

        const hasSpoilers = hasCharacterSpoilers(settings.spoilerSettings);

        expect(hasSpoilers).toEqual(false);
    });

    it("returns true when there are unlocked classes", () => {
        const settings: Settings = createTestSettings();
        settings.spoilerSettings.classes = [{ id: 2, imageUrl: "", spoilerSafeName: "Test Spoilery" }];

        const hasSpoilers = hasCharacterSpoilers(settings.spoilerSettings);

        expect(hasSpoilers).toEqual(true);
    });
});

describe("hasItemSpoilers", () => {
    it("returns false when prosperity is 1 and there are no active item groups", () => {
        const settings: Settings = createTestSettings();
        settings.spoilerSettings.items = { prosperity: 1, itemGroups: [] };

        const hasSpoilers = hasItemSpoilers(settings.spoilerSettings);

        expect(hasSpoilers).toEqual(false);
    });

    it("returns true when prosperity is > 1 and there are no active item groups", () => {
        const settings: Settings = createTestSettings();
        settings.spoilerSettings.items = { prosperity: 3, itemGroups: [] };

        const hasSpoilers = hasItemSpoilers(settings.spoilerSettings);

        expect(hasSpoilers).toEqual(true);
    });

    it("returns true when prosperity is 1 and there are active item groups", () => {
        const settings: Settings = createTestSettings();
        settings.spoilerSettings.items = { prosperity: 1, itemGroups: [{ id: 1, name: "Random Item Designs" }] };

        const hasSpoilers = hasItemSpoilers(settings.spoilerSettings);

        expect(hasSpoilers).toEqual(true);
    });

    it("returns true when prosperity is > 1 and there are active item groups", () => {
        const settings: Settings = createTestSettings();
        settings.spoilerSettings.items = { prosperity: 3, itemGroups: [{ id: 1, name: "Random Item Designs" }] };

        const hasSpoilers = hasItemSpoilers(settings.spoilerSettings);

        expect(hasSpoilers).toEqual(true);
    });
});
