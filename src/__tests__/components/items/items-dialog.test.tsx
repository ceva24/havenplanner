import { render, screen } from "@testing-library/react";
import ItemsDialog from "@/components/items/items-dialog";
import { createTestAppSettings, createTestCharacter, TestAppSettingsProvider } from "@/testutils";

const character = createTestCharacter();
const prosperityNineAppSettings = createTestAppSettings({
    spoilerSettings: { items: { prosperity: 9, itemGroups: [] } },
});

describe("items dialog", () => {
    it("renders", () => {
        render(<ItemsDialog isOpen handleClose={jest.fn()} character={character} setCharacter={jest.fn()} />, {
            wrapper: TestAppSettingsProvider,
        });

        const dialog = screen.queryByRole("dialog", { name: "Browse items" });

        expect(dialog).toBeInTheDocument();
    });

    it("renders an item", () => {
        render(<ItemsDialog isOpen handleClose={jest.fn()} character={character} setCharacter={jest.fn()} />, {
            wrapper: TestAppSettingsProvider,
        });

        const item = screen.queryByRole("img", { name: "Piercing Bow" });

        expect(item).toBeInTheDocument();
    });

    it("renders the items", () => {
        render(<ItemsDialog isOpen handleClose={jest.fn()} character={character} setCharacter={jest.fn()} />, {
            wrapper: TestAppSettingsProvider,
        });

        const items = screen.queryAllByRole("img");

        expect(items).toHaveLength(14);
    });

    it("renders the items based on the current prosperity level", () => {
        render(
            <TestAppSettingsProvider appSettings={prosperityNineAppSettings}>
                <ItemsDialog isOpen handleClose={jest.fn()} character={character} setCharacter={jest.fn()} />
            </TestAppSettingsProvider>
        );

        const items = screen.queryAllByRole("img");

        expect(items).toHaveLength(21);
    });

    it("renders the spoiler hint", () => {
        render(<ItemsDialog isOpen handleClose={jest.fn()} character={character} setCharacter={jest.fn()} />, {
            wrapper: TestAppSettingsProvider,
        });

        const spoilerHint = screen.queryByText("Change your spoiler settings to see more items...");

        expect(spoilerHint).toBeInTheDocument();
    });
});
