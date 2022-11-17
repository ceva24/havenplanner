import { render, screen } from "@testing-library/react";
import Profile from "@/components/profile/profile";
import AppSettingsProvider from "@/hooks/app-settings";
import { createTestCharacter } from "@/testutils";

const character: Character = createTestCharacter();

describe("profile tab", () => {
    it("renders the character details form", () => {
        render(
            <AppSettingsProvider character={character}>
                <Profile character={character} setCharacter={jest.fn()} />
            </AppSettingsProvider>
        );

        const characterDetailsForm = screen.queryByRole("form", {
            name: "Character Details",
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
