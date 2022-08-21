import { render, screen } from "@testing-library/react";
import PersonalQuest from "@/components/profile/personal-quest";
import AppSettingsProvider from "@/hooks/app-settings";
import { characterClasses } from "@/loaders/class";

const character: Character = {
    name: "My Char",
    experience: 25,
    gold: 50,
    notes: "Hello haven",
    characterClass: characterClasses[0],
    items: [],
    unlockedAbilityCards: [],
};

const setCharacter = jest.fn();

describe("personal quest", () => {
    it("renders the show personal quest switch", () => {
        render(
            <AppSettingsProvider character={character}>
                <PersonalQuest character={character} setCharacter={setCharacter} />
            </AppSettingsProvider>
        );

        const showPersonalQuestSwitch = screen.getByRole("checkbox", { name: "Show personal quest" });

        expect(showPersonalQuestSwitch).toBeInTheDocument();
    });

    it("renders the personal quest card", () => {
        render(
            <AppSettingsProvider character={character}>
                <PersonalQuest character={character} setCharacter={setCharacter} />
            </AppSettingsProvider>
        );

        const personalQuestCard = screen.getByRole("img", { name: "Personal quest" });

        expect(personalQuestCard).toBeInTheDocument();
    });

    it("renders the personal quest autocomplete", () => {
        render(
            <AppSettingsProvider character={character}>
                <PersonalQuest character={character} setCharacter={setCharacter} />
            </AppSettingsProvider>
        );

        const personalQuestAutocomplete = screen.getByRole("combobox");

        expect(personalQuestAutocomplete).toBeInTheDocument();
    });
});
