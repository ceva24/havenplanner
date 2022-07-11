import { render, screen, within } from "@testing-library/react";
import PersonalQuestDialog from "@/components/profile/personal-quest-dialog";
import { characterClasses, personalQuests } from "@/utils/constants";

const character: Character = {
    name: "Test",
    experience: 45,
    gold: 25,
    notes: "Hello",
    characterClass: characterClasses[1],
    personalQuest: personalQuests[2],
    items: [],
};

describe("personal quest dialog", () => {
    it("renders", () => {
        render(<PersonalQuestDialog isOpen character={character} setCharacter={jest.fn()} onClose={jest.fn()} />);

        const personalQuestDialog = screen.queryByRole("dialog", { name: "Personal quest" });

        expect(personalQuestDialog).toBeInTheDocument();
    });

    it("renders the autocomplete", () => {
        render(<PersonalQuestDialog isOpen character={character} setCharacter={jest.fn()} onClose={jest.fn()} />);

        const personalQuestDialog = screen.getByRole("dialog", { name: "Personal quest" });

        const personalQuestAutocomplete = within(personalQuestDialog).queryByRole("combobox");

        expect(personalQuestAutocomplete).toBeInTheDocument();
    });

    it("renders the personal quest card", () => {
        render(<PersonalQuestDialog isOpen character={character} setCharacter={jest.fn()} onClose={jest.fn()} />);

        const personalQuestDialog = screen.getByRole("dialog", { name: "Personal quest" });

        const personalQuestImage = within(personalQuestDialog).queryByRole("img", { name: "Personal quest" });

        expect(personalQuestImage).toBeInTheDocument();
    });
});
