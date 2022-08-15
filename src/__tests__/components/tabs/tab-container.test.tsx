import { render, screen } from "@testing-library/react";
import TabContainer from "@/components/tabs/tab-container";
import AppSettingsProvider from "@/hooks/app-settings";
import { characterClasses } from "@/utils/constants";

const character: Character = {
    name: "My Char",
    experience: 25,
    gold: 50,
    notes: "Hello haven",
    characterClass: characterClasses[0],
    items: [],
    unlockedAbilityCards: [],
};

describe("tab container", () => {
    it("renders the profile tab", () => {
        render(
            <AppSettingsProvider character={character}>
                <TabContainer character={character} setCharacter={jest.fn()} />
            </AppSettingsProvider>
        );

        const profileTab = screen.getByRole("tab", { name: "Profile" });

        expect(profileTab).toBeInTheDocument();
    });

    it("renders the items tab", () => {
        render(
            <AppSettingsProvider character={character}>
                <TabContainer character={character} setCharacter={jest.fn()} />
            </AppSettingsProvider>
        );

        const itemsTab = screen.getByRole("tab", { name: "Items" });

        expect(itemsTab).toBeInTheDocument();
    });

    it("renders the ability cards tab", () => {
        render(
            <AppSettingsProvider character={character}>
                <TabContainer character={character} setCharacter={jest.fn()} />
            </AppSettingsProvider>
        );

        const deckTab = screen.getByRole("tab", { name: "Ability Cards" });

        expect(deckTab).toBeInTheDocument();
    });

    it("renders the perks tab", () => {
        render(
            <AppSettingsProvider character={character}>
                <TabContainer character={character} setCharacter={jest.fn()} />
            </AppSettingsProvider>
        );

        const perksTab = screen.getByRole("tab", { name: "Perks" });

        expect(perksTab).toBeInTheDocument();
    });

    it("renders the profile tab panel by default", () => {
        render(
            <AppSettingsProvider character={character}>
                <TabContainer character={character} setCharacter={jest.fn()} />
            </AppSettingsProvider>
        );

        const profileTabPanel = screen.getByRole("tabpanel", { name: "Profile" });

        expect(profileTabPanel).toBeVisible();
    });
});
