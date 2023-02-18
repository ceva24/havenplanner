import { render, screen } from "@testing-library/react";
import ItemsDialog from "@/components/items/items-dialog";
import { createTestCharacter, defaultAppSettingsProvider } from "@/testutils";

const character = createTestCharacter();

describe("items dialog", () => {
    it("renders", () => {
        render(<ItemsDialog isOpen handleClose={jest.fn()} character={character} setCharacter={jest.fn()} />, {
            wrapper: defaultAppSettingsProvider,
        });

        const dialog = screen.queryByRole("dialog", { name: "Browse items" });

        expect(dialog).toBeInTheDocument();
    });

    it("renders an item", () => {
        render(<ItemsDialog isOpen handleClose={jest.fn()} character={character} setCharacter={jest.fn()} />, {
            wrapper: defaultAppSettingsProvider,
        });

        const item = screen.queryByRole("img", { name: "Piercing Bow" });

        expect(item).toBeInTheDocument();
    });

    it("renders the items", () => {
        render(<ItemsDialog isOpen handleClose={jest.fn()} character={character} setCharacter={jest.fn()} />, {
            wrapper: defaultAppSettingsProvider,
        });

        const items = screen.queryAllByRole("img");

        expect(items).toHaveLength(14);
    });
});
