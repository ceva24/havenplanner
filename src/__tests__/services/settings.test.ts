import { itemGroupIsActive } from "@/services/settings";
import { createTestAppSettings } from "@/testutils";

describe("itemGroupIsActive", () => {
    it("returns true when the item group is active in the app settings", () => {
        const itemGroup = { id: 0, name: "Group" };

        const appSettings = createTestAppSettings();
        appSettings.spoilerSettings.itemGroups = [itemGroup];

        const isActive = itemGroupIsActive(itemGroup, appSettings);

        expect(isActive).toEqual(true);
    });

    it("returns false when the item group is inactive in the app settings", () => {
        const itemGroup = { id: 0, name: "Group" };

        const appSettings = createTestAppSettings();

        const isActive = itemGroupIsActive(itemGroup, appSettings);

        expect(isActive).toEqual(false);
    });
});
