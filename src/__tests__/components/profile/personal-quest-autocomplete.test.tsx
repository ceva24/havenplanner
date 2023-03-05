import { render, screen } from "@testing-library/react";
import PersonalQuestAutocomplete, { findAndSetPersonalQuest } from "@/components/profile/personal-quest-autocomplete";
import { createTestCharacter, createTestPersonalQuest } from "@/test/create-test-fixtures";
import { TestSettingsProvider } from "@/test/test-settings-provider";

const personalQuests = [createTestPersonalQuest(1, "Test Quest 1"), createTestPersonalQuest(2, "Test Quest 2")];

const character: Character = createTestCharacter({
    personalQuest: personalQuests[0],
});

beforeEach(() => {
    jest.clearAllMocks();
});

describe("personal quest autocomplete", () => {
    it("renders", () => {
        render(<PersonalQuestAutocomplete character={character} setCharacter={jest.fn()} />, {
            wrapper: TestSettingsProvider,
        });

        const personalQuestAutocomplete = screen.queryByRole("combobox", { name: "Personal quest" });

        expect(personalQuestAutocomplete).toBeInTheDocument();
    });
});

describe("findAndSetPersonalQuest", () => {
    it("sets the personal quest to the selected value", () => {
        const personalQuest = personalQuests[0];
        const setCharacter = jest.fn();

        findAndSetPersonalQuest(personalQuest, personalQuests, character, setCharacter);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter.mock.calls[0][0]).toEqual({ ...character, personalQuest });
    });

    it("clears the personal quest when no value is selected", () => {
        const setCharacter = jest.fn();

        findAndSetPersonalQuest(null, personalQuests, character, setCharacter);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter.mock.calls[0][0]).toEqual({ ...character, personalQuest: undefined });
    });
});
