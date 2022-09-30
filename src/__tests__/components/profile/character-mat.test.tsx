import { render, screen } from "@testing-library/react";
import CharacterMat from "@/components/profile/character-mat";
import { characterClasses } from "@/loaders/character-classes";

describe("character mat", () => {
    it("renders", () => {
        render(<CharacterMat characterClass={characterClasses[0]} />);

        const characterMat = screen.queryByRole("img", {
            name: "Character mat front",
        });

        expect(characterMat).toBeInTheDocument();
    });
});
