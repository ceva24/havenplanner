import { render, screen } from "@testing-library/react";
import AbilityCards from "@/components/ability-cards/ability-cards";
import { createTestCharacter, defaultAppSettingsProvider } from "@/testutils";

const character = createTestCharacter();
const setCharacter = jest.fn();

describe("ability cards", () => {
    it("renders the deck tab", () => {
        render(<AbilityCards character={character} setCharacter={setCharacter} />, {
            wrapper: defaultAppSettingsProvider,
        });

        const deckTab = screen.getByRole("tab", { name: "Deck" });

        expect(deckTab).toBeInTheDocument();
    });

    it("renders the hand tab", () => {
        render(<AbilityCards character={character} setCharacter={setCharacter} />, {
            wrapper: defaultAppSettingsProvider,
        });

        const handTab = screen.getByRole("tab", { name: "Hand" });

        expect(handTab).toBeInTheDocument();
    });

    it("renders the enhancements tab", () => {
        render(<AbilityCards character={character} setCharacter={setCharacter} />, {
            wrapper: defaultAppSettingsProvider,
        });

        const enhancementsTab = screen.getByRole("tab", { name: "Enhancements" });

        expect(enhancementsTab).toBeInTheDocument();
    });

    it("renders the deck by default", () => {
        render(<AbilityCards character={character} setCharacter={setCharacter} />, {
            wrapper: defaultAppSettingsProvider,
        });

        const level1Cards = screen.queryByRole("region", { name: "Level 1 Ability Cards" });

        expect(level1Cards).toBeInTheDocument();
    });
});
