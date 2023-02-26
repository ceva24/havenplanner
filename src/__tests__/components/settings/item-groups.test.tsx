import { render, screen } from "@testing-library/react";
import ItemGroups, { toggleItemGroup } from "@/components/settings/item-groups";
import { createTestAppSettings, TestAppSettingsProvider } from "@/testutils";

const setAppSettings = jest.fn();

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
        const appSettings = createTestAppSettings();
        appSettings.spoilerSettings.itemGroups = [{ id: 0, name: group }];

        render(
            <TestAppSettingsProvider appSettings={appSettings}>
                <ItemGroups />
            </TestAppSettingsProvider>
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

        const appSettings = createTestAppSettings();

        toggleItemGroup(itemGroup, appSettings, setAppSettings);

        expect(setAppSettings).toHaveBeenCalledTimes(1);
        expect(setAppSettings).toHaveBeenCalledWith({
            ...appSettings,
            spoilerSettings: { ...appSettings.spoilerSettings, itemGroups: [itemGroup] },
        });
    });

    it("deactivates an item group that was active", () => {
        const itemGroup: ItemGroup = {
            id: 0,
            name: "Item Group",
        };

        const appSettings = createTestAppSettings();
        appSettings.spoilerSettings.itemGroups = [itemGroup];

        toggleItemGroup(itemGroup, appSettings, setAppSettings);

        expect(setAppSettings).toHaveBeenCalledTimes(1);
        expect(setAppSettings).toHaveBeenCalledWith({
            ...appSettings,
            spoilerSettings: { ...appSettings.spoilerSettings, itemGroups: [] },
        });
    });
});
