import { render, screen } from "@testing-library/react";
import ItemGroup from "@/client/components/items/item-group";
import { createTestCharacter, createTestItem } from "@/test/create-test-fixtures";

describe("item group", () => {
    it("renders the title", () => {
        render(
            <ItemGroup
                title="Random Item Designs"
                items={[]}
                handleClose={jest.fn()}
                character={createTestCharacter()}
                setCharacter={jest.fn()}
            />,
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
            />,
        );

        const title = screen.queryByText("Prosperity 1");

        expect(title).toBeInTheDocument();
    });

    it("renders the items", () => {
        render(
            <ItemGroup
                title=""
                items={[createTestItem(1, "Boots of Test", "1")]}
                handleClose={jest.fn()}
                character={createTestCharacter()}
                setCharacter={jest.fn()}
            />,
        );

        const item = screen.queryByRole("img", { name: "Boots of Test" });

        expect(item).toBeInTheDocument();
    });
});
