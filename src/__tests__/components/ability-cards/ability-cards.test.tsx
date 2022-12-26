import { render, screen } from "@testing-library/react";
import AbilityCards from "@/components/ability-cards/ability-cards";
import { defaultCharacter } from "@/constants";
import AppSettingsProvider from "@/hooks/app-settings";

const setCharacter = jest.fn();

describe("ability cards", () => {
    it("renders the deck tab", () => {
        render(
            <AppSettingsProvider character={defaultCharacter}>
                <AbilityCards character={defaultCharacter} setCharacter={setCharacter} />
            </AppSettingsProvider>
        );

        const deckTab = screen.getByRole("tab", { name: "Deck" });

        expect(deckTab).toBeInTheDocument();
    });

    it("renders the hand tab", () => {
        render(
            <AppSettingsProvider character={defaultCharacter}>
                <AbilityCards character={defaultCharacter} setCharacter={setCharacter} />
            </AppSettingsProvider>
        );

        const handTab = screen.getByRole("tab", { name: "Hand" });

        expect(handTab).toBeInTheDocument();
    });

    it("renders the deck by default", () => {
        render(
            <AppSettingsProvider character={defaultCharacter}>
                <AbilityCards character={defaultCharacter} setCharacter={setCharacter} />
            </AppSettingsProvider>
        );

        const level1Cards = screen.queryByRole("region", { name: "Level 1 Ability Cards" });

        expect(level1Cards).toBeInTheDocument();
    });
});
