import { render, screen } from "@testing-library/react";
import Profile from "@/components/profile/profile";

import { createTestCharacter } from "@/test/utils";
import { TestSettingsProvider } from "@/test/test-settings-provider";

const character: Character = createTestCharacter();

describe("profile tab", () => {
    it("renders the character details form", () => {
        render(<Profile character={character} setCharacter={jest.fn()} />, { wrapper: TestSettingsProvider });

        const characterDetailsForm = screen.queryByRole("form", {
            name: "Character Details",
        });

        expect(characterDetailsForm).toBeInTheDocument();
    });

    it("renders the character mat", () => {
        render(<Profile character={character} setCharacter={jest.fn()} />, { wrapper: TestSettingsProvider });

        const characterMat = screen.queryByRole("img", {
            name: "Character mat front",
        });

        expect(characterMat).toBeInTheDocument();
    });

    it("renders the personal quest switch", () => {
        render(<Profile character={character} setCharacter={jest.fn()} />, { wrapper: TestSettingsProvider });

        const personalQuestSwitch = screen.queryByRole("checkbox", {
            name: "Show personal quest",
        });

        expect(personalQuestSwitch).toBeInTheDocument();
    });
});
