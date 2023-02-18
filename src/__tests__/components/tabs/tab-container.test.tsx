import { render, screen } from "@testing-library/react";
import TabContainer from "@/components/tabs/tab-container";
import { createTestCharacter, defaultAppSettingsProvider } from "@/testutils";

const character: Character = createTestCharacter();

describe("tab container", () => {
    it("renders the profile tab", () => {
        render(<TabContainer character={character} setCharacter={jest.fn()} />, {
            wrapper: defaultAppSettingsProvider,
        });

        const profileTab = screen.getByRole("tab", { name: "Profile" });

        expect(profileTab).toBeInTheDocument();
    });

    it("renders the items tab", () => {
        render(<TabContainer character={character} setCharacter={jest.fn()} />, {
            wrapper: defaultAppSettingsProvider,
        });

        const itemsTab = screen.getByRole("tab", { name: "Items" });

        expect(itemsTab).toBeInTheDocument();
    });

    it("renders the ability cards tab", () => {
        render(<TabContainer character={character} setCharacter={jest.fn()} />, {
            wrapper: defaultAppSettingsProvider,
        });

        const deckTab = screen.getByRole("tab", { name: "Ability Cards" });

        expect(deckTab).toBeInTheDocument();
    });

    it("renders the perks tab", () => {
        render(<TabContainer character={character} setCharacter={jest.fn()} />, {
            wrapper: defaultAppSettingsProvider,
        });

        const perksTab = screen.getByRole("tab", { name: "Perks" });

        expect(perksTab).toBeInTheDocument();
    });

    it("renders the profile tab panel by default", () => {
        render(<TabContainer character={character} setCharacter={jest.fn()} />, {
            wrapper: defaultAppSettingsProvider,
        });

        const profileTabPanel = screen.getByRole("tabpanel", { name: "Profile" });

        expect(profileTabPanel).toBeVisible();
    });
});
