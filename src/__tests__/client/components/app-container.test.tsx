import { render, screen } from "@testing-library/react";
import AppContainer from "@/client/components/app-container";
import { createTestCharacter } from "@/test/create-test-fixtures";
import { TestSettingsProvider } from "@/test/test-settings-provider";

const character: Character = createTestCharacter();

describe("app container", () => {
    it("renders the profile tab", () => {
        render(<AppContainer character={character} setCharacter={jest.fn()} />, {
            wrapper: TestSettingsProvider,
        });

        const profileTab = screen.getByRole("tab", { name: "Profile" });

        expect(profileTab).toBeInTheDocument();
    });

    it("renders the items tab", () => {
        render(<AppContainer character={character} setCharacter={jest.fn()} />, {
            wrapper: TestSettingsProvider,
        });

        const itemsTab = screen.getByRole("tab", { name: "Items" });

        expect(itemsTab).toBeInTheDocument();
    });

    it("renders the ability cards tab", () => {
        render(<AppContainer character={character} setCharacter={jest.fn()} />, {
            wrapper: TestSettingsProvider,
        });

        const deckTab = screen.getByRole("tab", { name: "Ability Cards" });

        expect(deckTab).toBeInTheDocument();
    });

    it("renders the perks tab", () => {
        render(<AppContainer character={character} setCharacter={jest.fn()} />, {
            wrapper: TestSettingsProvider,
        });

        const perksTab = screen.getByRole("tab", { name: "Perks" });

        expect(perksTab).toBeInTheDocument();
    });

    it("renders the profile tab panel by default", () => {
        render(<AppContainer character={character} setCharacter={jest.fn()} />, {
            wrapper: TestSettingsProvider,
        });

        const profileTabPanel = screen.getByRole("tabpanel", { name: "Profile" });

        expect(profileTabPanel).toBeVisible();
    });
});
