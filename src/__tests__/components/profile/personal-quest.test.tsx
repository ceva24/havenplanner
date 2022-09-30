import { render, screen } from "@testing-library/react";
import PersonalQuest from "@/components/profile/personal-quest";
import AppSettingsProvider from "@/hooks/app-settings";
import { personalQuests } from "@/loaders/personal-quests";
import { createTestCharacter } from "@/testutils";

const character: Character = createTestCharacter();

const setCharacter = jest.fn();

describe("personal quest", () => {
    it("renders the show personal quest switch when it is set in app settings", () => {
        const characterWithPersonalQuest: Character = createTestCharacter({
            personalQuest: personalQuests[0],
        });

        render(
            <AppSettingsProvider character={characterWithPersonalQuest}>
                <PersonalQuest character={characterWithPersonalQuest} setCharacter={setCharacter} />
            </AppSettingsProvider>
        );

        const showPersonalQuestSwitch = screen.getByRole("checkbox", { name: "Show personal quest" });

        expect(showPersonalQuestSwitch).toBeInTheDocument();
    });

    it("does not render the show personal quest switch when it is not set in app settings", () => {
        render(
            <AppSettingsProvider character={character}>
                <PersonalQuest character={character} setCharacter={setCharacter} />
            </AppSettingsProvider>
        );

        const showPersonalQuestSwitch = screen.queryByRole("checkbox", { name: "Show personal quest" });

        expect(showPersonalQuestSwitch).not.toBeInTheDocument();
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
