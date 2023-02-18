import { render, screen } from "@testing-library/react";
import PersonalQuest from "@/components/profile/personal-quest";
import { personalQuests } from "@/loaders/personal-quests";
import { createTestCharacter, defaultAppSettingsProvider } from "@/testutils";

const character: Character = createTestCharacter();

const setCharacter = jest.fn();

describe("personal quest", () => {
    it("renders the hide personal quest switch", () => {
        const characterWithPersonalQuest: Character = createTestCharacter({
            personalQuest: personalQuests[0],
        });

        render(<PersonalQuest character={characterWithPersonalQuest} setCharacter={setCharacter} />, {
            wrapper: defaultAppSettingsProvider,
        });

        const showPersonalQuestSwitch = screen.getByRole("checkbox", { name: "Hide personal quest" });

        expect(showPersonalQuestSwitch).toBeInTheDocument();
    });

    it("renders the personal quest card", () => {
        render(<PersonalQuest character={character} setCharacter={setCharacter} />, {
            wrapper: defaultAppSettingsProvider,
        });

        const personalQuestCard = screen.getByRole("img", { name: "Personal quest" });

        expect(personalQuestCard).toBeInTheDocument();
    });

    it("renders the personal quest autocomplete", () => {
        render(<PersonalQuest character={character} setCharacter={setCharacter} />, {
            wrapper: defaultAppSettingsProvider,
        });

        const personalQuestAutocomplete = screen.getByRole("combobox");

        expect(personalQuestAutocomplete).toBeInTheDocument();
    });
});
