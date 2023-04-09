import { filterItems } from "@/server/services/items";
import { createTestSettingsWithItemSpoilers, createTestItem } from "@/test/create-test-fixtures";

describe("filterItems", () => {
    it("returns items not hidden by spoiler settings", () => {
        const settings: Settings = createTestSettingsWithItemSpoilers(1, []);
        const items: Item[] = [createTestItem(0, "Boots of Test", "1"), createTestItem(1, "Cloak of Test", "2")];

        const filteredItems = filterItems(items, settings.spoilerSettings);

        expect(filteredItems).toHaveLength(1);
    });
});
