import { render, screen, within } from "@testing-library/react";
import BrowseItemsDialog from "@/components/items/browse-items-dialog";
import { createTestSettings, createTestCharacter, createTestItem } from "@/test/create-test-fixtures";
import { TestSettingsProvider } from "@/test/test-settings-provider";

const character: Character = createTestCharacter();

const settings: Settings = createTestSettings();

const items = [createTestItem(1, "Boots of Test", "1")];

describe("browse items dialog", () => {
    it("renders", () => {
        render(
            <BrowseItemsDialog
                isOpen
                handleClose={jest.fn()}
                character={character}
                setCharacter={jest.fn()}
                items={items}
            />,
            {
                wrapper: TestSettingsProvider,
            }
        );

        const dialog = screen.queryByRole("dialog", { name: "Browse items" });

        expect(dialog).toBeInTheDocument();
    });

    it("renders an item", () => {
        render(
            <TestSettingsProvider settings={settings}>
                <BrowseItemsDialog
                    isOpen
                    handleClose={jest.fn()}
                    character={character}
                    setCharacter={jest.fn()}
                    items={items}
                />
            </TestSettingsProvider>
        );

        const item = screen.queryByRole("img", { name: "Boots of Test" });

        expect(item).toBeInTheDocument();
    });

    it("renders the items", () => {
        render(
            <TestSettingsProvider settings={settings}>
                <BrowseItemsDialog
                    isOpen
                    handleClose={jest.fn()}
                    character={character}
                    setCharacter={jest.fn()}
                    items={items}
                />
            </TestSettingsProvider>
        );

        const itemImages = screen.queryAllByRole("img");

        expect(itemImages).toHaveLength(1);
    });

    it("renders items as item groups", () => {
        render(
            <TestSettingsProvider settings={settings}>
                <BrowseItemsDialog
                    isOpen
                    handleClose={jest.fn()}
                    character={character}
                    setCharacter={jest.fn()}
                    items={items}
                />
            </TestSettingsProvider>
        );

        const itemGroup = screen.getByRole("region", { name: "Prosperity 1" });

        const itemImages = within(itemGroup).queryAllByRole("img");

        expect(itemImages).toHaveLength(1);
    });

    it("renders the spoiler hint", () => {
        render(
            <BrowseItemsDialog
                isOpen
                handleClose={jest.fn()}
                character={character}
                setCharacter={jest.fn()}
                items={items}
            />,
            {
                wrapper: TestSettingsProvider,
            }
        );

        const spoilerHint = screen.queryByText("Change your spoiler settings to see more items...");

        expect(spoilerHint).toBeInTheDocument();
    });
});
