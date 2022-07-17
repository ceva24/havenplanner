import { render, screen } from "@testing-library/react";
import TabbedContent from "@/components/tabbed-content";

const character: Character = {
    name: "My Char",
    experience: 25,
    gold: 50,
    notes: "Hello haven",
    characterClass: {
        id: 0,
        name: "Test 1",
        imageUrl: "/character-icons/gloomhaven/gh-brute.png",
        characterMatImageUrl: "/worldhaven/images/character-mats/gloomhaven/gh-brute.png",
    },
    items: [],
};

describe("tabbed content", () => {
    it("renders the profile tab", () => {
        render(<TabbedContent character={character} setCharacter={jest.fn()} />);

        const profileTab = screen.getByRole("tab", { name: "Profile" });

        expect(profileTab).toBeInTheDocument();
    });

    it("renders the items tab", () => {
        render(<TabbedContent character={character} setCharacter={jest.fn()} />);

        const itemsTab = screen.getByRole("tab", { name: "Items" });

        expect(itemsTab).toBeInTheDocument();
    });

    it("renders the deck tab", () => {
        render(<TabbedContent character={character} setCharacter={jest.fn()} />);

        const deckTab = screen.getByRole("tab", { name: "Deck" });

        expect(deckTab).toBeInTheDocument();
    });

    it("renders the perks tab", () => {
        render(<TabbedContent character={character} setCharacter={jest.fn()} />);

        const perksTab = screen.getByRole("tab", { name: "Perks" });

        expect(perksTab).toBeInTheDocument();
    });

    it("renders the profile tab panel by default", () => {
        render(<TabbedContent character={character} setCharacter={jest.fn()} />);

        const profileTabPanel = screen.getByRole("tabpanel", { name: "Profile" });

        expect(profileTabPanel).toBeVisible();
    });
});
