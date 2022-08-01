import { render, screen } from "@testing-library/react";
import Profile from "@/components/tabs/profile";
import { characterClasses } from "@/utils/constants";
import AppSettingsProvider from "@/hooks/app-settings";

const character: Character = {
    name: "My Char",
    experience: 25,
    gold: 50,
    notes: "Hello haven",
    characterClass: characterClasses[0],
    items: [],
};

describe("profile tab", () => {
    it("renders the character details form", () => {
        render(
            <AppSettingsProvider character={character}>
                <Profile character={character} setCharacter={jest.fn()} />
            </AppSettingsProvider>
        );

        const characterDetailsForm = screen.queryByRole("form", {
            name: "Character details form",
        });

        expect(characterDetailsForm).toBeInTheDocument();
    });

    it("renders the character mat", () => {
        render(
            <AppSettingsProvider character={character}>
                <Profile character={character} setCharacter={jest.fn()} />
            </AppSettingsProvider>
        );

        const characterMat = screen.queryByRole("img", {
            name: "Character mat front",
        });

        expect(characterMat).toBeInTheDocument();
    });

    it("renders the personal quest", () => {
        render(
            <AppSettingsProvider character={character}>
                <Profile character={character} setCharacter={jest.fn()} />
            </AppSettingsProvider>
        );

        const personalQuest = screen.queryByRole("img", {
            name: "Personal quest",
        });

        expect(personalQuest).toBeInTheDocument();
    });
});
