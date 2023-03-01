import { render, screen, within } from "@testing-library/react";
import BrowseItemsDialog from "@/components/items/browse-items-dialog";
import { createTestAppSettings, createTestCharacter, TestAppSettingsProvider } from "@/testutils";

const character = createTestCharacter();
const prosperityNineAppSettings = createTestAppSettings({
    spoilerSettings: { items: { prosperity: 9, itemGroups: [] } },
});

describe("browse items dialog", () => {
    it("renders", () => {
        render(<BrowseItemsDialog isOpen handleClose={jest.fn()} character={character} setCharacter={jest.fn()} />, {
            wrapper: TestAppSettingsProvider,
        });

        const dialog = screen.queryByRole("dialog", { name: "Browse items" });

        expect(dialog).toBeInTheDocument();
    });

    it("renders an item", () => {
        render(<BrowseItemsDialog isOpen handleClose={jest.fn()} character={character} setCharacter={jest.fn()} />, {
            wrapper: TestAppSettingsProvider,
        });

        const item = screen.queryByRole("img", { name: "Piercing Bow" });

        expect(item).toBeInTheDocument();
    });

    it("renders the items", () => {
        render(<BrowseItemsDialog isOpen handleClose={jest.fn()} character={character} setCharacter={jest.fn()} />, {
            wrapper: TestAppSettingsProvider,
        });

        const items = screen.queryAllByRole("img");

        expect(items).toHaveLength(14);
    });

    it("renders the items based on the current prosperity level", () => {
        render(
            <TestAppSettingsProvider appSettings={prosperityNineAppSettings}>
                <BrowseItemsDialog isOpen handleClose={jest.fn()} character={character} setCharacter={jest.fn()} />
            </TestAppSettingsProvider>
        );

        const items = screen.queryAllByRole("img");

        expect(items).toHaveLength(21);
    });

    it("renders items as item groups", () => {
        render(<BrowseItemsDialog isOpen handleClose={jest.fn()} character={character} setCharacter={jest.fn()} />, {
            wrapper: TestAppSettingsProvider,
        });

        const itemGroup = screen.getByRole("region", { name: "Prosperity 1" });

        const items = within(itemGroup).queryAllByRole("img");

        expect(items).toHaveLength(14);
    });

    it("renders the spoiler hint", () => {
        render(<BrowseItemsDialog isOpen handleClose={jest.fn()} character={character} setCharacter={jest.fn()} />, {
            wrapper: TestAppSettingsProvider,
        });

        const spoilerHint = screen.queryByText("Change your spoiler settings to see more items...");

        expect(spoilerHint).toBeInTheDocument();
    });
});
