import { render, screen } from "@testing-library/react";
import PersonalQuestAutocomplete, { findAndSetPersonalQuest } from "@/components/profile/personal-quest-autocomplete";
import { personalQuests } from "@/loaders/personal-quests";
import { createTestCharacter } from "@/test/test-fixtures";

const character: Character = createTestCharacter({
    personalQuest: personalQuests[2],
});

beforeEach(() => {
    jest.clearAllMocks();
});

describe("personal quest autocomplete", () => {
    it("renders", () => {
        render(<PersonalQuestAutocomplete character={character} setCharacter={jest.fn()} />);

        const personalQuestAutocomplete = screen.queryByRole("combobox");

        expect(personalQuestAutocomplete).toBeInTheDocument();
    });
});

describe("findAndSetPersonalQuest", () => {
    it("sets the personal quest to the selected value", () => {
        const personalQuest = personalQuests[0];
        const setCharacter = jest.fn();

        findAndSetPersonalQuest(personalQuest, character, setCharacter);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter.mock.calls[0][0]).toEqual({ ...character, personalQuest: personalQuests[0] });
    });

    it("clears the personal quest when no value is selected", () => {
        const setCharacter = jest.fn();

        findAndSetPersonalQuest(null, character, setCharacter);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter.mock.calls[0][0]).toEqual({ ...character, personalQuest: undefined });
    });
});
