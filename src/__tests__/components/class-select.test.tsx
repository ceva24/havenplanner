import { render, screen } from "@testing-library/react";
import { ClassSelect } from "../../components/class-select";

const characterClasses = [
    {
        id: 0,
        name: "Test",
        characterMatImageUrl:
            "/worldhaven/images/character-mats/gloomhaven/gh-brute.png",
    },
    {
        id: 1,
        name: "Test 2",
        characterMatImageUrl:
            "/worldhaven/images/character-mats/gloomhaven/gh-scoundrel.png",
    },
];

describe("Class Select", () => {
    it("renders", () => {
        render(
            <ClassSelect
                characterClass={undefined}
                characterClasses={characterClasses}
                setCharacterClass={() => null}
            />
        );

        const classSelect = screen.queryByRole("button", { name: "Class" });

        expect(classSelect).toBeInTheDocument();
    });
});
