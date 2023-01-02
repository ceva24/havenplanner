import { render, screen } from "@testing-library/react";
import Deck from "@/components/ability-cards/deck/deck";
import { createTestCharacter } from "@/testutils";

const setCharacter = jest.fn();

describe("deck", () => {
    it("renders cards of a level", () => {
        const character: Character = createTestCharacter();

        render(<Deck character={character} setCharacter={setCharacter} />);

        const level1Cards = screen.queryByRole("region", { name: "Level 1 Ability Cards" });

        expect(level1Cards).toBeInTheDocument();
    });

    it("renders cards of multiple levels", () => {
        const character: Character = createTestCharacter({
            characterClass: {
                id: 0,
                name: "Brute",
                imageUrl: "/images/character-icons/gloomhaven/gh-brute.webp",
                characterMatFrontImageUrl: "/images/character-mats/gloomhaven/gh-brute.webp",
                characterMatBackImageUrl: "/images/character-mats/gloomhaven/gh-brute-back.webp",
                cardBackImageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-br-back.webp",
                handSize: 10,
                abilityCards: [
                    {
                        id: 1,
                        name: "Trample",
                        level: "1",
                        imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-trample.webp",
                        enhancementSlots: [],
                    },
                    {
                        id: 11,
                        name: "Skewer",
                        level: "X",
                        imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-skewer.webp",
                        enhancementSlots: [],
                    },
                ],
                perks: [],
            },
        });

        render(<Deck character={character} setCharacter={setCharacter} />);

        const level1Cards = screen.queryByRole("region", { name: "Level 1 Ability Cards" });
        const levelxCards = screen.queryByRole("region", { name: "Level X Ability Cards" });

        expect(level1Cards).toBeInTheDocument();
        expect(levelxCards).toBeInTheDocument();
    });

    it("renders level X cards in the right order", () => {
        const character: Character = createTestCharacter({
            characterClass: {
                id: 0,
                name: "Brute",
                imageUrl: "/images/character-icons/gloomhaven/gh-brute.webp",
                characterMatFrontImageUrl: "/images/character-mats/gloomhaven/gh-brute.webp",
                characterMatBackImageUrl: "/images/character-mats/gloomhaven/gh-brute-back.webp",
                cardBackImageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-br-back.webp",
                handSize: 10,
                abilityCards: [
                    {
                        id: 1,
                        name: "Trample",
                        level: "1",
                        imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-trample.webp",
                        enhancementSlots: [],
                    },
                    {
                        id: 15,
                        name: "Juggernaut",
                        level: "2",
                        imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-juggernaut.webp",
                        enhancementSlots: [],
                    },
                    {
                        id: 11,
                        name: "Skewer",
                        level: "X",
                        imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-skewer.webp",
                        enhancementSlots: [],
                    },
                ],
                perks: [],
            },
        });

        const { asFragment } = render(<Deck character={character} setCharacter={setCharacter} />);

        const content = asFragment();

        expect(content.childNodes[0].childNodes[0].textContent).toEqual("Level 1");
        expect(content.childNodes[0].childNodes[1].textContent).toEqual("Level X");
        expect(content.childNodes[0].childNodes[2].textContent).toEqual("Level 2");
    });

    interface LevelRoleProps {
        level: string;
        role: string;
    }

    it.each`
        level  | role
        ${"1"} | ${"img"}
        ${"X"} | ${"img"}
        ${"2"} | ${"checkbox"}
        ${"3"} | ${"checkbox"}
        ${"4"} | ${"checkbox"}
        ${"5"} | ${"checkbox"}
        ${"6"} | ${"checkbox"}
        ${"7"} | ${"checkbox"}
        ${"8"} | ${"checkbox"}
        ${"9"} | ${"checkbox"}
    `("renders level $level cards as role $role", ({ level, role }: LevelRoleProps) => {
        const character: Character = createTestCharacter({
            experience: 500,
            characterClass: {
                id: 0,
                name: "Brute",
                imageUrl: "/images/character-icons/gloomhaven/gh-brute.webp",
                characterMatFrontImageUrl: "/images/character-mats/gloomhaven/gh-brute.webp",
                characterMatBackImageUrl: "/images/character-mats/gloomhaven/gh-brute-back.webp",
                cardBackImageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-br-back.webp",
                handSize: 10,
                abilityCards: [
                    {
                        id: 1,
                        name: "Trample",
                        level,
                        imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-trample.webp",
                        enhancementSlots: [],
                    },
                ],
                perks: [],
            },
        });

        render(<Deck character={character} setCharacter={setCharacter} />);

        const abilityCard = screen.queryByRole(role, { name: "Trample" });

        expect(abilityCard).toBeInTheDocument();
    });
});
