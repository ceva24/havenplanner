import { render, screen } from "@testing-library/react";
import PersonalQuestAutocomplete, {
    convertPersonalQuestToAutocompleteEntry,
    findAndSetPersonalQuest,
    getPersonalQuestAutocompleteEntries,
    PersonalQuestAutocompleteEntry,
} from "@/components/profile/personal-quest-autocomplete";
import { characterClasses, personalQuests } from "@/utils/constants";

const character: Character = {
    name: "Test",
    experience: 45,
    gold: 25,
    notes: "Hello",
    characterClass: characterClasses[1],
    personalQuest: personalQuests[2],
};

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

describe("getPersonalQuestAutocompleteEntries", () => {
    it("returns autocomplete entries", () => {
        const autocompleteEntries = getPersonalQuestAutocompleteEntries();

        expect(autocompleteEntries.length).toEqual(personalQuests.length);
        expect(autocompleteEntries[0].label).toEqual(personalQuests[0].name);
    });
});

describe("convertPersonalQuestToAutocompleteEntries", () => {
    it("returns an autocomplete entry", () => {
        const personalQuest: PersonalQuest = {
            id: 500,
            name: "Test quest",
            imageUrl: "/worldhaven/images/personal-quests/gloomhaven/gh-pq-back.png",
        };

        const autocompleteEntry = convertPersonalQuestToAutocompleteEntry(personalQuest);

        expect(autocompleteEntry.label).toEqual("Test quest");
    });

    it("returns a blank string for an undefined entry", () => {
        const autocompleteEntry = convertPersonalQuestToAutocompleteEntry(undefined);

        expect(autocompleteEntry.label).toEqual("");
    });
});

describe("findAndSetPersonalQuest", () => {
    it("sets the personal quest to the selected value", () => {
        const personalQuestAutocompleteEntry: PersonalQuestAutocompleteEntry = { label: personalQuests[0].name };
        const setCharacter = jest.fn();

        findAndSetPersonalQuest(personalQuestAutocompleteEntry, character, setCharacter);

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
