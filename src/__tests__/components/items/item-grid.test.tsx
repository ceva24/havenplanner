import { render, screen } from "@testing-library/react";
import ItemGrid from "@/components/items/item-grid";
import { prosperityOneItems } from "@/loaders/items";
import { createTestCharacter } from "@/testutils";

describe("item grid", () => {
    it("renders character items", () => {
        const character: Character = createTestCharacter({
            items: [
                { id: "1", item: prosperityOneItems[8] },
                { id: "2", item: prosperityOneItems[5] },
            ],
        });

        render(<ItemGrid character={character} setCharacter={jest.fn()} />);

        const firstItem = screen.queryByRole("img", { name: prosperityOneItems[8].name });
        const secondItem = screen.queryByRole("img", { name: prosperityOneItems[5].name });

        expect(firstItem).toBeInTheDocument();
        expect(secondItem).toBeInTheDocument();
    });
});
