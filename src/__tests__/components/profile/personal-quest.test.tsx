import { render, screen } from "@testing-library/react";
import PersonalQuest from "@/components/profile/personal-quest";

import { createTestCharacter } from "@/test/utils";
import { TestSettingsProvider } from "@/test/test-settings-provider";

const character: Character = createTestCharacter();

const setCharacter = jest.fn();

describe("personal quest", () => {
    it("renders the personal quest card", () => {
        render(<PersonalQuest character={character} setCharacter={setCharacter} />, {
            wrapper: TestSettingsProvider,
        });

        const personalQuestCard = screen.getByRole("img", { name: "Personal quest" });

        expect(personalQuestCard).toBeInTheDocument();
    });

    it("renders the personal quest autocomplete", () => {
        render(<PersonalQuest character={character} setCharacter={setCharacter} />, {
            wrapper: TestSettingsProvider,
        });

        const personalQuestAutocomplete = screen.getByRole("combobox");

        expect(personalQuestAutocomplete).toBeInTheDocument();
    });
});
