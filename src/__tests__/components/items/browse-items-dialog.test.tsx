import { render, screen, within } from "@testing-library/react";
import BrowseItemsDialog from "@/components/items/browse-items-dialog";
import { createTestSettings, createTestCharacter, createTestItem } from "@/test/create-test-fixtures";
import { TestSettingsProvider } from "@/test/test-settings-provider";

const character: Character = createTestCharacter();

const settings: Settings = createTestSettings();

const prosperityNineSettings = createTestSettings({
    spoilerSettings: { items: { prosperity: 9, itemGroups: [] } },
});

beforeAll(() => {
    const items = [
        createTestItem(1, "Testing Bow", "1"),
        createTestItem(2, "Boots of Test", "1"),
        createTestItem(3, "Powerful Boots of Test", "2"),
    ];

    settings.gameData.items = items;
    prosperityNineSettings.gameData.items = items;
});

describe("browse items dialog", () => {
    it("renders", () => {
        render(<BrowseItemsDialog isOpen handleClose={jest.fn()} character={character} setCharacter={jest.fn()} />, {
            wrapper: TestSettingsProvider,
        });

        const dialog = screen.queryByRole("dialog", { name: "Browse items" });

        expect(dialog).toBeInTheDocument();
    });

    it("renders an item", () => {
        render(
            <TestSettingsProvider settings={settings}>
                <BrowseItemsDialog isOpen handleClose={jest.fn()} character={character} setCharacter={jest.fn()} />
            </TestSettingsProvider>
        );

        const item = screen.queryByRole("img", { name: "Testing Bow" });

        expect(item).toBeInTheDocument();
    });

    it("renders the items", () => {
        render(
            <TestSettingsProvider settings={settings}>
                <BrowseItemsDialog isOpen handleClose={jest.fn()} character={character} setCharacter={jest.fn()} />
            </TestSettingsProvider>
        );

        const items = screen.queryAllByRole("img");

        expect(items).toHaveLength(2);
    });

    it("renders the items based on the current prosperity level", () => {
        render(
            <TestSettingsProvider settings={prosperityNineSettings}>
                <BrowseItemsDialog isOpen handleClose={jest.fn()} character={character} setCharacter={jest.fn()} />
            </TestSettingsProvider>
        );

        const items = screen.queryAllByRole("img");

        expect(items).toHaveLength(3);
    });

    it("renders items as item groups", () => {
        render(
            <TestSettingsProvider settings={settings}>
                <BrowseItemsDialog isOpen handleClose={jest.fn()} character={character} setCharacter={jest.fn()} />
            </TestSettingsProvider>
        );

        const itemGroup = screen.getByRole("region", { name: "Prosperity 1" });

        const items = within(itemGroup).queryAllByRole("img");

        expect(items).toHaveLength(2);
    });

    it("renders the spoiler hint", () => {
        render(<BrowseItemsDialog isOpen handleClose={jest.fn()} character={character} setCharacter={jest.fn()} />, {
            wrapper: TestSettingsProvider,
        });

        const spoilerHint = screen.queryByText("Change your spoiler settings to see more items...");

        expect(spoilerHint).toBeInTheDocument();
    });
});
