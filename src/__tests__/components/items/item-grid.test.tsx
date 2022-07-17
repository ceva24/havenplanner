import { render, screen } from "@testing-library/react";
import ItemGrid from "@/components/items/item-grid";
import { characterClasses, items } from "@/utils/constants";

describe("item grid", () => {
    it("renders character items", () => {
        const character: Character = {
            name: "Test",
            experience: 0,
            gold: 0,
            notes: "",
            characterClass: characterClasses[0],
            items: [
                { id: "1", item: items[8] },
                { id: "2", item: items[5] },
            ],
        };

        render(<ItemGrid character={character} setCharacter={jest.fn()} />);

        const firstItem = screen.queryByRole("img", { name: items[8].name });
        const secondItem = screen.queryByRole("img", { name: items[5].name });

        expect(firstItem).toBeInTheDocument();
        expect(secondItem).toBeInTheDocument();
    });
});
