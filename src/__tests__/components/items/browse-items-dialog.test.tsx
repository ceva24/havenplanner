import { render, screen, within } from "@testing-library/react";
import BrowseItemsDialog from "@/components/items/browse-items-dialog";
import { createTestSettings, createTestCharacter, createTestItem } from "@/test/create-test-fixtures";
import { TestSettingsProvider } from "@/test/test-settings-provider";
import * as useItemsHook from "@/hooks/use-items";

const character: Character = createTestCharacter();

const settings: Settings = createTestSettings();

const item: Item = createTestItem(1, "Boots of Test", "1");

jest.mock("@/hooks/use-items", () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return {
        __esModule: true,
        ...jest.requireActual("@/hooks/use-items"),
    };
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
        jest.spyOn(useItemsHook, "useItems").mockReturnValueOnce({ items: [item], isLoading: false, isError: false });

        render(
            <TestSettingsProvider settings={settings}>
                <BrowseItemsDialog isOpen handleClose={jest.fn()} character={character} setCharacter={jest.fn()} />
            </TestSettingsProvider>
        );

        const itemImage = screen.queryByRole("img", { name: "Boots of Test" });

        expect(itemImage).toBeInTheDocument();
    });

    it("renders items as item groups", () => {
        jest.spyOn(useItemsHook, "useItems").mockReturnValueOnce({ items: [item], isLoading: false, isError: false });

        render(
            <TestSettingsProvider settings={settings}>
                <BrowseItemsDialog isOpen handleClose={jest.fn()} character={character} setCharacter={jest.fn()} />
            </TestSettingsProvider>
        );

        const itemGroup = screen.getByRole("region", { name: "Prosperity 1" });

        const itemImages = within(itemGroup).queryAllByRole("img");

        expect(itemImages).toHaveLength(1);
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
