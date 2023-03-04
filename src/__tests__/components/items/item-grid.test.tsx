import { render, screen } from "@testing-library/react";
import ItemGrid from "@/components/items/item-grid";
import { items } from "@/loaders/items";
import { createTestCharacter } from "@/test/utils";

describe("item grid", () => {
    it("renders character items", () => {
        const character: Character = createTestCharacter({
            items: [
                { id: "1", item: items[8] },
                { id: "2", item: items[5] },
            ],
        });

        render(<ItemGrid character={character} setCharacter={jest.fn()} />);

        const firstItem = screen.queryByRole("img", { name: items[8].name });
        const secondItem = screen.queryByRole("img", { name: items[5].name });

        expect(firstItem).toBeInTheDocument();
        expect(secondItem).toBeInTheDocument();
    });
});
