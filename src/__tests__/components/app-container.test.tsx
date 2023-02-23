import { render, screen } from "@testing-library/react";
import AppContainer from "@/components/app-container";
import { createTestCharacter, TestAppSettingsProvider } from "@/testutils";

const character: Character = createTestCharacter();

describe("app container", () => {
    it("renders the profile tab", () => {
        render(<AppContainer character={character} setCharacter={jest.fn()} />, {
            wrapper: TestAppSettingsProvider,
        });

        const profileTab = screen.getByRole("tab", { name: "Profile" });

        expect(profileTab).toBeInTheDocument();
    });

    it("renders the items tab", () => {
        render(<AppContainer character={character} setCharacter={jest.fn()} />, {
            wrapper: TestAppSettingsProvider,
        });

        const itemsTab = screen.getByRole("tab", { name: "Items" });

        expect(itemsTab).toBeInTheDocument();
    });

    it("renders the ability cards tab", () => {
        render(<AppContainer character={character} setCharacter={jest.fn()} />, {
            wrapper: TestAppSettingsProvider,
        });

        const deckTab = screen.getByRole("tab", { name: "Ability Cards" });

        expect(deckTab).toBeInTheDocument();
    });

    it("renders the perks tab", () => {
        render(<AppContainer character={character} setCharacter={jest.fn()} />, {
            wrapper: TestAppSettingsProvider,
        });

        const perksTab = screen.getByRole("tab", { name: "Perks" });

        expect(perksTab).toBeInTheDocument();
    });

    it("renders the profile tab panel by default", () => {
        render(<AppContainer character={character} setCharacter={jest.fn()} />, {
            wrapper: TestAppSettingsProvider,
        });

        const profileTabPanel = screen.getByRole("tabpanel", { name: "Profile" });

        expect(profileTabPanel).toBeVisible();
    });
});