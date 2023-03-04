import { render, screen } from "@testing-library/react";
import ItemGroups, { toggleItemGroup } from "@/components/settings/item-groups";
import { createTestSettings } from "@/test/test-fixtures";
import { TestSettingsProvider } from "@/test/test-settings-provider";

const setSettings = jest.fn();

beforeEach(() => {
    jest.resetAllMocks();
});
describe("item groups", () => {
    interface ItemGroupsProps {
        group: string;
    }

    it("renders", () => {
        const settings = createTestSettings();

        render(<ItemGroups />, { wrapper: TestSettingsProvider });

        const itemGroup = screen.queryByRole("checkbox", { name: "Random Item Designs" });

        expect(itemGroup).toBeInTheDocument();
    });
});

describe("toggleItemGroup", () => {
    it("activates an item group that was inactive", () => {
        const itemGroup: ItemGroup = {
            id: 0,
            name: "Item Group",
        };

        const settings = createTestSettings();

        toggleItemGroup(itemGroup, settings, setSettings);

        expect(setSettings).toHaveBeenCalledTimes(1);
        expect(setSettings).toHaveBeenCalledWith({
            ...settings,
            spoilerSettings: { ...settings.spoilerSettings, items: { prosperity: 1, itemGroups: [itemGroup] } },
        });
    });

    it("deactivates an item group that was active", () => {
        const itemGroup: ItemGroup = {
            id: 0,
            name: "Item Group",
        };

        const settings = createTestSettings();
        settings.spoilerSettings.items.itemGroups = [itemGroup];

        toggleItemGroup(itemGroup, settings, setSettings);

        expect(setSettings).toHaveBeenCalledTimes(1);
        expect(setSettings).toHaveBeenCalledWith({
            ...settings,
            spoilerSettings: { ...settings.spoilerSettings, items: { prosperity: 1, itemGroups: [] } },
        });
    });
});
