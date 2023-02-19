import { render, screen } from "@testing-library/react";
import Profile from "@/components/profile/profile";
import AppSettingsProvider from "@/hooks/use-app-settings";
import { createTestCharacter, defaultAppSettingsProvider } from "@/testutils";

const character: Character = createTestCharacter();

describe("profile tab", () => {
    it("renders the character details form", () => {
        render(<Profile character={character} setCharacter={jest.fn()} />, { wrapper: defaultAppSettingsProvider });

        const characterDetailsForm = screen.queryByRole("form", {
            name: "Character Details",
        });

        expect(characterDetailsForm).toBeInTheDocument();
    });

    it("renders the character mat", () => {
        render(<Profile character={character} setCharacter={jest.fn()} />, { wrapper: defaultAppSettingsProvider });

        const characterMat = screen.queryByRole("img", {
            name: "Character mat front",
        });

        expect(characterMat).toBeInTheDocument();
    });

    it("renders the personal quest", () => {
        render(<Profile character={character} setCharacter={jest.fn()} />, { wrapper: defaultAppSettingsProvider });

        const personalQuest = screen.queryByRole("img", {
            name: "Personal quest",
        });

        expect(personalQuest).toBeInTheDocument();
    });
});
