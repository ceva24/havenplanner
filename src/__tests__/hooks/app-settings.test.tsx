import { render, screen } from "@testing-library/react";
import AppSettingsProvider, { useAppSettingsContext } from "@/hooks/app-settings";
import { characterClasses } from "@/utils/constants";
import PersonalQuest from "@/components/profile/personal-quest";

const character: Character = {
    name: "My Char",
    experience: 25,
    gold: 50,
    notes: "Hello haven",
    characterClass: characterClasses[0],
    items: [],
    unlockedAbilityCards: [],
};

describe("app settings provider", () => {
    it("renders children", () => {
        render(
            <AppSettingsProvider character={character}>
                <h1>Click me</h1>
            </AppSettingsProvider>
        );

        const children = screen.getByRole("heading", { name: "Click me" });

        expect(children).toBeInTheDocument();
    });
});

describe("useAppSettingsContext", () => {
    it("throws an error when app settings have not been set", () => {
        expect(() => {
            render(<PersonalQuest character={character} setCharacter={jest.fn()} />);
        }).toThrowError("No AppSettingsContext Provider found when calling useAppSettingsContext");
    });
});
