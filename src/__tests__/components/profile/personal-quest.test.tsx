import { render, screen } from "@testing-library/react";
import PersonalQuest from "@/components/profile/personal-quest";
import { createTestCharacter, TestAppSettingsProvider } from "@/testutils";

const character: Character = createTestCharacter();

const setCharacter = jest.fn();

describe("personal quest", () => {
    it("renders the personal quest card", () => {
        render(<PersonalQuest character={character} setCharacter={setCharacter} />, {
            wrapper: TestAppSettingsProvider,
        });

        const personalQuestCard = screen.getByRole("img", { name: "Personal quest" });

        expect(personalQuestCard).toBeInTheDocument();
    });

    it("renders the personal quest autocomplete", () => {
        render(<PersonalQuest character={character} setCharacter={setCharacter} />, {
            wrapper: TestAppSettingsProvider,
        });

        const personalQuestAutocomplete = screen.getByRole("combobox");

        expect(personalQuestAutocomplete).toBeInTheDocument();
    });
});
