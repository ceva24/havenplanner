import { render, screen } from "@testing-library/react";
import CharacterMat from "@/components/profile/character-mat";
import { createTestCharacterClass } from "@/test/create-test-fixtures";

describe("character mat", () => {
    it("renders", () => {
        render(<CharacterMat characterClass={createTestCharacterClass(1, "Test Kitten")} />);

        const characterMat = screen.queryByRole("img", {
            name: "Character mat front",
        });

        expect(characterMat).toBeInTheDocument();
    });
});
