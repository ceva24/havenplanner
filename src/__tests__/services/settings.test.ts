import { itemGroupIsActive } from "@/services/settings";
import { createTestSettings } from "@/testutils";

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
