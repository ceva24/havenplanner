import { itemShouldBeHidden } from "@/shared/services/items";
import {
    createTestItem,
    createTestSettings,
    createTestSettingsWithItemSpoilers,
    createTestItemGroup,
} from "@/test/create-test-fixtures";

describe("itemShouldBeHidden", () => {
    it("returns true when the item is above the current prosperity", () => {
        const item = createTestItem(0, "Boots of Test", "2");

        const settings: Settings = createTestSettings();

        const shouldBeHidden = itemShouldBeHidden(item, settings.spoilerSettings);

        expect(shouldBeHidden).toEqual(true);
    });

    it("returns false when the item is equal to the current prosperity", () => {
        const item = createTestItem(0, "Boots of Test", "2");

        const settings: Settings = createTestSettingsWithItemSpoilers(2, []);

        const shouldBeHidden = itemShouldBeHidden(item, settings.spoilerSettings);

        expect(shouldBeHidden).toEqual(false);
    });

    it("returns false when the item is below the current prosperity", () => {
        const item = createTestItem(0, "Boots of Test", "2");

        const settings: Settings = createTestSettingsWithItemSpoilers(8, []);

        const shouldBeHidden = itemShouldBeHidden(item, settings.spoilerSettings);

        expect(shouldBeHidden).toEqual(false);
    });

    it("returns true when the item is not in the active item groups", () => {
        const item = createTestItem(0, "Boots of Test", "Random Item Designs");

        const settings: Settings = createTestSettingsWithItemSpoilers(2, []);

        const shouldBeHidden = itemShouldBeHidden(item, settings.spoilerSettings);

        expect(shouldBeHidden).toEqual(true);
    });

    it("returns false when the item is in the active item groups", () => {
        const item = createTestItem(0, "Boots of Test", "Random Item Designs");

        const settings: Settings = createTestSettingsWithItemSpoilers(2, [
            createTestItemGroup(0, "Random Item Designs"),
        ]);

        const shouldBeHidden = itemShouldBeHidden(item, settings.spoilerSettings);

        expect(shouldBeHidden).toEqual(false);
    });
});
