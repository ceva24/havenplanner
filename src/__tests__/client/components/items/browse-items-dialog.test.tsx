import { render, screen, within } from "@testing-library/react";
import BrowseItemsDialog from "@/client/components/items/browse-items-dialog";
import { createTestSettings, createTestCharacter, createTestItem } from "@/test/create-test-fixtures";
import { TestSettingsProvider } from "@/test/test-settings-provider";
import * as useItemsHook from "@/client/hooks/data/use-items";

const character: Character = createTestCharacter();

const item: Item = createTestItem(1, "Boots of Test", "1", "Legs");

jest.mock("@/client/hooks/data/use-items");

beforeEach(() => {
    jest.clearAllMocks();
});

describe("browse items dialog", () => {
    it("renders", () => {
        jest.spyOn(useItemsHook, "useItems").mockReturnValueOnce({ items: [item], isLoading: false, isError: false });

        render(<BrowseItemsDialog isOpen handleClose={jest.fn()} character={character} setCharacter={jest.fn()} />, {
            wrapper: TestSettingsProvider,
        });

        const dialog = screen.queryByRole("dialog", { name: "Browse items" });

        expect(dialog).toBeInTheDocument();
    });

    it("renders an item", () => {
        jest.spyOn(useItemsHook, "useItems").mockReturnValueOnce({ items: [item], isLoading: false, isError: false });

        render(<BrowseItemsDialog isOpen handleClose={jest.fn()} character={character} setCharacter={jest.fn()} />, {
            wrapper: TestSettingsProvider,
        });

        const itemImage = screen.queryByRole("img", { name: "Boots of Test" });

        expect(itemImage).toBeInTheDocument();
    });

    it("renders the item slot filters", () => {
        jest.spyOn(useItemsHook, "useItems").mockReturnValueOnce({ items: [item], isLoading: false, isError: false });

        render(<BrowseItemsDialog isOpen handleClose={jest.fn()} character={character} setCharacter={jest.fn()} />, {
            wrapper: TestSettingsProvider,
        });

        const itemSlotFilters = screen.queryByRole("region", { name: "Item Slot Filters" });

        expect(itemSlotFilters).toBeInTheDocument();
    });

    it("filters items by slot", () => {
        const itemSlot: ItemSlot = { id: 1, name: "Legs", imageUrl: "" };

        const settingsWithFilteredItemSlots: Settings = createTestSettings();
        settingsWithFilteredItemSlots.gameData.itemSlots = [itemSlot];
        settingsWithFilteredItemSlots.userSettings.filteredItemSlots = [itemSlot];

        const newItem: Item = createTestItem(2, "Cloak of Test", "1", "Chest");

        jest.spyOn(useItemsHook, "useItems").mockReturnValueOnce({
            items: [item, newItem],
            isLoading: false,
            isError: false,
        });

        render(
            <TestSettingsProvider settings={settingsWithFilteredItemSlots}>
                <BrowseItemsDialog isOpen handleClose={jest.fn()} character={character} setCharacter={jest.fn()} />
            </TestSettingsProvider>
        );

        const itemGroup = screen.getByRole("region", { name: "Prosperity 1" });

        const itemImages = within(itemGroup).queryAllByRole("img");

        expect(itemImages).toHaveLength(1);
    });

    it("renders items as item groups", () => {
        jest.spyOn(useItemsHook, "useItems").mockReturnValueOnce({ items: [item], isLoading: false, isError: false });

        render(<BrowseItemsDialog isOpen handleClose={jest.fn()} character={character} setCharacter={jest.fn()} />, {
            wrapper: TestSettingsProvider,
        });

        const itemGroup = screen.getByRole("region", { name: "Prosperity 1" });

        const itemImages = within(itemGroup).queryAllByRole("img");

        expect(itemImages).toHaveLength(1);
    });

    it("does not render an item group if all items are filtered", () => {
        const itemSlot: ItemSlot = { id: 1, name: "Legs", imageUrl: "" };

        const settingsWithFilteredItemSlots: Settings = createTestSettings();
        settingsWithFilteredItemSlots.gameData.itemSlots = [itemSlot];
        settingsWithFilteredItemSlots.userSettings.filteredItemSlots = [itemSlot];

        jest.spyOn(useItemsHook, "useItems").mockReturnValueOnce({
            items: [item],
            isLoading: false,
            isError: false,
        });

        render(
            <TestSettingsProvider settings={settingsWithFilteredItemSlots}>
                <BrowseItemsDialog isOpen handleClose={jest.fn()} character={character} setCharacter={jest.fn()} />
            </TestSettingsProvider>
        );

        const itemGroup = screen.queryByRole("region", { name: "Prosperity 1" });

        expect(itemGroup).not.toBeInTheDocument();
    });

    it("renders the item filter hint when all items are filtered", () => {
        const itemSlot: ItemSlot = { id: 1, name: "Legs", imageUrl: "" };

        const settingsWithFilteredItemSlots: Settings = createTestSettings();
        settingsWithFilteredItemSlots.gameData.itemSlots = [itemSlot];
        settingsWithFilteredItemSlots.userSettings.filteredItemSlots = [itemSlot];

        jest.spyOn(useItemsHook, "useItems").mockReturnValueOnce({
            items: [item],
            isLoading: false,
            isError: false,
        });

        render(
            <TestSettingsProvider settings={settingsWithFilteredItemSlots}>
                <BrowseItemsDialog isOpen handleClose={jest.fn()} character={character} setCharacter={jest.fn()} />
            </TestSettingsProvider>
        );

        const itemFilterHint = screen.queryByText("No items matching filters");

        expect(itemFilterHint).toBeInTheDocument();
    });

    it("does not render the item filter hint when only some items are filtered", () => {
        const itemSlots: ItemSlot[] = [
            { id: 1, name: "Legs", imageUrl: "" },
            { id: 2, name: "Head", imageUrl: "" },
        ];

        const settingsWithFilteredItemSlots: Settings = createTestSettings();
        settingsWithFilteredItemSlots.gameData.itemSlots = itemSlots;
        settingsWithFilteredItemSlots.userSettings.filteredItemSlots = [itemSlots[0]];

        jest.spyOn(useItemsHook, "useItems").mockReturnValueOnce({
            items: [item],
            isLoading: false,
            isError: false,
        });

        render(
            <TestSettingsProvider settings={settingsWithFilteredItemSlots}>
                <BrowseItemsDialog isOpen handleClose={jest.fn()} character={character} setCharacter={jest.fn()} />
            </TestSettingsProvider>
        );

        const itemFilterHint = screen.queryByText("No items matching filters");

        expect(itemFilterHint).not.toBeInTheDocument();
    });

    it("renders the spoiler hint", () => {
        jest.spyOn(useItemsHook, "useItems").mockReturnValueOnce({ items: [item], isLoading: false, isError: false });

        render(<BrowseItemsDialog isOpen handleClose={jest.fn()} character={character} setCharacter={jest.fn()} />, {
            wrapper: TestSettingsProvider,
        });

        const spoilerHint = screen.queryByText("Change your spoiler settings to see more items...");

        expect(spoilerHint).toBeInTheDocument();
    });

    it("shows the loading text when item data is loading", () => {
        jest.spyOn(useItemsHook, "useItems").mockReturnValueOnce({ items: undefined, isLoading: true, isError: false });

        render(<BrowseItemsDialog isOpen handleClose={jest.fn()} character={character} setCharacter={jest.fn()} />, {
            wrapper: TestSettingsProvider,
        });

        const loadingText = screen.queryByText("Loading...");

        expect(loadingText).toBeInTheDocument();
    });

    it("shows the error text when item data cannot be retrieved", () => {
        jest.spyOn(useItemsHook, "useItems").mockReturnValueOnce({ items: undefined, isLoading: true, isError: true });

        render(<BrowseItemsDialog isOpen handleClose={jest.fn()} character={character} setCharacter={jest.fn()} />, {
            wrapper: TestSettingsProvider,
        });

        const errorText = screen.queryByText("Failed to load items");

        expect(errorText).toBeInTheDocument();
    });
});
