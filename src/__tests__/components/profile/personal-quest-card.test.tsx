import { render, screen } from "@testing-library/react";
import PersonalQuestCard from "@/components/profile/personal-quest-card";
import { characterClasses } from "@/utils/constants";

const character: Character = {
    name: "Test",
    experience: 45,
    gold: 25,
    notes: "Hello",
    characterClass: characterClasses[1],
};
describe("personal quest card", () => {
    it("renders", () => {
        render(<PersonalQuestCard character={character} setCharacter={jest.fn()} />);

        const personalQuestCard = screen.queryByRole("button", { name: "Personal quest" });

        expect(personalQuestCard).toBeInTheDocument();
    });
});
