import { render, screen } from "@testing-library/react";
import ItemGrid from "@/components/items/item-grid";
import { createTestCharacter, createTestItem } from "@/test/create-test-fixtures";

describe("item grid", () => {
    it("renders character items", () => {
        const character: Character = createTestCharacter({
            items: [
                { id: "1", item: createTestItem(1, "Boots of Test", "1"), showAlternativeImage: false },
                { id: "2", item: createTestItem(2, "Cloak of Test", "1"), showAlternativeImage: false },
            ],
        });

        render(<ItemGrid character={character} setCharacter={jest.fn()} />);

        const firstItem = screen.queryByRole("img", { name: "Boots of Test" });
        const secondItem = screen.queryByRole("img", { name: "Cloak of Test" });

        expect(firstItem).toBeInTheDocument();
        expect(secondItem).toBeInTheDocument();
    });
});
