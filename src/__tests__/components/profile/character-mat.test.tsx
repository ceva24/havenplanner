import { render, screen } from "@testing-library/react";
import CharacterMat from "@/components/profile/character-mat";
import { characterClasses } from "@/utils/constants";

describe("Character Mat", () => {
    it("renders", () => {
        render(<CharacterMat characterClass={characterClasses[0]} />);

        const characterMat = screen.queryByRole("img", {
            name: "Character mat front",
        });

        expect(characterMat).toBeInTheDocument();
    });
});
