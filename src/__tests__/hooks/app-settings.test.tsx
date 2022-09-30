import { render, screen } from "@testing-library/react";
import AppSettingsProvider from "@/hooks/app-settings";
import PersonalQuest from "@/components/profile/personal-quest";
import { createTestCharacter } from "@/testutils";

const character: Character = createTestCharacter();

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
