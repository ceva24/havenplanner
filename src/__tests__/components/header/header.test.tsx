import { render, screen } from "@testing-library/react";
import Header from "@/components/header/header";

import { createTestCharacter } from "@/test/test-fixtures";
import { TestSettingsProvider } from "@/test/test-settings-provider";

const character: Character = createTestCharacter();
const setCharacter = jest.fn();

describe("header", () => {
    it("renders the heading as a link", () => {
        render(<Header character={character} setCharacter={setCharacter} />, { wrapper: TestSettingsProvider });

        const headerLink = screen.queryByRole("link", {
            name: "Gloomhaven Character Planner",
        });

        expect(headerLink).toBeInTheDocument();
    });

    it("renders the share button", () => {
        render(<Header character={character} setCharacter={setCharacter} />, { wrapper: TestSettingsProvider });

        const shareButton = screen.queryByRole("button", {
            name: "Share",
        });

        expect(shareButton).toBeInTheDocument();
    });

    it("renders the settings button", () => {
        render(<Header character={character} setCharacter={setCharacter} />, { wrapper: TestSettingsProvider });

        const settingsButton = screen.queryByRole("button", {
            name: "Settings",
        });

        expect(settingsButton).toBeInTheDocument();
    });

    it("does not render the share button when no character is passed", () => {
        render(<Header />);

        const shareButton = screen.queryByRole("button", {
            name: "Share",
        });

        expect(shareButton).not.toBeInTheDocument();
    });

    it("does not render the settings button when no character is passed", () => {
        render(<Header />);

        const settingsButton = screen.queryByRole("button", {
            name: "Settings",
        });

        expect(settingsButton).not.toBeInTheDocument();
    });
});
