import { getDefaultSettings, itemGroupIsActive } from "@/services/settings";
import { createTestSettings } from "@/testutils";

describe("getDefaultSettings", () => {
    it("returns default settings", () => {
        const settings = getDefaultSettings();

        expect(settings.gameSettings.defaultCharacter.characterClass.id).toEqual(1);

        expect(settings.selectedAbilityCardsTabIndex).toEqual(0);
        expect(settings.showPersonalQuest).toEqual(false);

        expect(settings.spoilerSettings.items.prosperity).toEqual(1);
        expect(settings.spoilerSettings.items.itemGroups).toEqual([]);
    });
});

describe("itemGroupIsActive", () => {
    it("returns true when the item group is active in the app settings", () => {
        const itemGroup = { id: 0, name: "Group" };

        const settings = createTestSettings();
        settings.spoilerSettings.items.itemGroups = [itemGroup];

        const isActive = itemGroupIsActive(itemGroup, settings);

        expect(isActive).toEqual(true);
    });

    it("returns false when the item group is inactive in the app settings", () => {
        const itemGroup = { id: 0, name: "Group" };

        const settings = createTestSettings();

        const isActive = itemGroupIsActive(itemGroup, settings);

        expect(isActive).toEqual(false);
    });
});
