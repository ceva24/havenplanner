import { render, screen } from "@testing-library/react";
import ItemGroups, { toggleItemGroup } from "@/components/settings/item-groups";
import { createTestSettings, TestSettingsProvider } from "@/testutils";

const setSettings = jest.fn();

beforeEach(() => {
    jest.resetAllMocks();
});
describe("item groups", () => {
    interface ItemGroupsProps {
        group: string;
    }

    it.each`
        group
        ${"Random Item Designs"}
        ${"Other Items"}
        ${"Solo Scenario Items"}
    `("renders the $group checkbox", ({ group }: ItemGroupsProps) => {
        const settings = createTestSettings();
        settings.spoilerSettings.items.itemGroups = [{ id: 0, name: group }];

        render(
            <TestSettingsProvider settings={settings}>
                <ItemGroups />
            </TestSettingsProvider>
        );

        const itemGroup = screen.queryByRole("checkbox", { name: group });

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
