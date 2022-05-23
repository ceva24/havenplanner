import { render, screen } from "@testing-library/react";
import CharacterMat from "../../components/character-mat";

describe("Character Mat", () => {
    it("renders", () => {
        const characterClass: CharacterClass = {
            id: 0,
            name: "Test",
            characterMatImageUrl:
                "/worldhaven/images/character-mats/gloomhaven/gh-brute.png",
        };

        render(<CharacterMat characterClass={characterClass} />);

        const characterMat = screen.queryByRole("img", {
            name: "Character mat",
        });

        expect(characterMat).toBeInTheDocument();
    });

    it("does not render when no character is passed in", () => {
        render(<CharacterMat characterClass={undefined} />);

        const characterMat = screen.queryByRole("img", {
            name: "Character mat",
        });

        expect(characterMat).not.toBeInTheDocument();
    });
});
