import { render, screen } from "@testing-library/react";
import ItemGroup from "@/components/items/item-group";
import { createTestCharacter } from "@/testutils";
import { items } from "@/loaders/items";

describe("item group", () => {
    it("renders the title", () => {
        render(
            <ItemGroup
                title="Random Item Designs"
                items={[]}
                handleClose={jest.fn()}
                character={createTestCharacter()}
                setCharacter={jest.fn()}
            />
        );

        const title = screen.queryByText("Random Item Designs");

        expect(title).toBeInTheDocument();
    });

    it("formats prosperity titles", () => {
        render(
            <ItemGroup
                title="1"
                items={[]}
                handleClose={jest.fn()}
                character={createTestCharacter()}
                setCharacter={jest.fn()}
            />
        );

        const title = screen.queryByText("Prosperity 1");

        expect(title).toBeInTheDocument();
    });

    it("renders the items", () => {
        render(
            <ItemGroup
                title=""
                items={[items[0]]}
                handleClose={jest.fn()}
                character={createTestCharacter()}
                setCharacter={jest.fn()}
            />
        );

        const item = screen.queryByRole("img", { name: "Boots of Striding" });

        expect(item).toBeInTheDocument();
    });
});
