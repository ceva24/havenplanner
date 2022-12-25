import { render, screen, within } from "@testing-library/react";
import Perks from "@/components/perks/perks";
import { createTestCharacter } from "@/testutils";
import { gainPerk, removePerk } from "@/components/perks/perk-list";
import * as characterService from "@/services/character";

jest.mock("@/services/character");

const setCharacter = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
});

describe("perk list", () => {
    it("renders a perk", () => {
        const character = createTestCharacter();
        character.characterClass.perks = [
            {
                description: "Remove two {-1} cards",
                count: 1,
                add: [],
                remove: [],
            },
        ];

        render(<Perks character={character} setCharacter={setCharacter} />);

        const perk = screen.queryByRole("checkbox", { name: "Remove two {-1} cards" });

        expect(perk).toBeInTheDocument();
    });

    it("renders multiple perks", () => {
        const character = createTestCharacter();
        character.characterClass.perks = [
            {
                description: "Remove two {-1} cards",
                count: 1,
                add: [],
                remove: [],
            },
            {
                description: "Replace one {-1} card with one {+1} card",
                count: 1,
                add: [],
                remove: [],
            },
            {
                description: "Add one {+3} card",
                count: 1,
                add: [],
                remove: [],
            },
            {
                description: "Add two {chain} PIERCE {pierce} 3 cards",
                count: 1,
                add: [],
                remove: [],
            },
        ];

        render(<Perks character={character} setCharacter={setCharacter} />);

        const perkOne = screen.queryByRole("checkbox", { name: "Remove two {-1} cards" });
        const perkTwo = screen.queryByRole("checkbox", { name: "Replace one {-1} card with one {+1} card" });
        const perkThree = screen.queryByRole("checkbox", { name: "Add one {+3} card" });
        const perkFour = screen.queryByRole("checkbox", { name: "Add two {chain} PIERCE {pierce} 3 cards" });

        expect(perkOne).toBeInTheDocument();
        expect(perkTwo).toBeInTheDocument();
        expect(perkThree).toBeInTheDocument();
        expect(perkFour).toBeInTheDocument();
    });

    it("renders perks with multiple checkboxes", () => {
        const character = createTestCharacter();
        character.characterClass.perks = [
            {
                description: "Add two {+1} cards",
                count: 2,
                add: [],
                remove: [],
            },
        ];

        render(<Perks character={character} setCharacter={setCharacter} />);

        const perkList = screen.getByRole("region", { name: "Perk List" });

        const checkboxes = within(perkList).queryAllByRole("checkbox");

        expect(checkboxes).toHaveLength(2);
    });

    it("renders multiple checkboxes with unique labels", () => {
        const character = createTestCharacter();
        character.characterClass.perks = [
            {
                description: "Add two {+1} cards",
                count: 2,
                add: [],
                remove: [],
            },
        ];

        render(<Perks character={character} setCharacter={setCharacter} />);

        const checkboxOne = screen.queryByRole("checkbox", { name: "Add two {+1} cards" });
        const checkboxTwo = screen.queryByRole("checkbox", { name: "Add two {+1} cards 2" });

        expect(checkboxOne).toBeInTheDocument();
        expect(checkboxTwo).toBeInTheDocument();
    });

    it("renders checked perks", () => {
        const character = createTestCharacter();

        const perk: Perk = {
            description: "Remove two {-1} cards",
            count: 1,
            add: [],
            remove: [],
        };

        character.characterClass.perks = [perk];
        character.gainedPerks = [{ perk, checkboxIndex: 0 }];

        jest.spyOn(characterService, "characterHasGainedPerk").mockReturnValue(true);

        render(<Perks character={character} setCharacter={setCharacter} />);

        const perkCheckbox = screen.queryByRole("checkbox", { name: "Remove two {-1} cards" });

        expect(perkCheckbox).toBeChecked();
    });
});

describe("gainPerk", () => {
    it("adds the perk to the character's gained perks", () => {
        const character: Character = createTestCharacter();

        const perk: Perk = {
            description: "Remove two {-1} cards",
            count: 1,
            add: [],
            remove: [],
        };

        gainPerk(perk, 0, character, setCharacter);

        expect(setCharacter).toHaveBeenCalledTimes(1);

        const newCharacter: Character = setCharacter.mock.calls[0][0] as Character;

        expect(newCharacter.gainedPerks).toHaveLength(1);
        expect(newCharacter.gainedPerks[0].perk).toEqual(perk);
        expect(newCharacter.gainedPerks[0].checkboxIndex).toEqual(0);
    });
});

describe("removePerk", () => {
    it("removes an existing gained perk", () => {
        const character: Character = createTestCharacter();

        const perk: Perk = {
            description: "Remove two {-1} cards",
            count: 1,
            add: [],
            remove: [],
        };

        character.characterClass.perks = [perk];
        character.gainedPerks = [{ perk, checkboxIndex: 0 }];

        jest.spyOn(characterService, "findCharacterGainedPerk").mockReturnValue(character.gainedPerks[0]);

        removePerk(perk, 0, character, setCharacter);

        expect(setCharacter).toHaveBeenCalledTimes(1);

        const newCharacter: Character = setCharacter.mock.calls[0][0] as Character;

        expect(newCharacter.gainedPerks).toHaveLength(0);
    });

    it("does not remove an existing gained perk with a different checkbox index", () => {
        const character: Character = createTestCharacter();

        const perk: Perk = {
            description: "Remove two {-1} cards",
            count: 1,
            add: [],
            remove: [],
        };

        character.characterClass.perks = [perk];
        character.gainedPerks = [{ perk, checkboxIndex: 0 }];

        jest.spyOn(characterService, "findCharacterGainedPerk").mockReturnValue({ perk, checkboxIndex: 1 });

        removePerk(perk, 0, character, setCharacter);

        expect(setCharacter).toHaveBeenCalledTimes(1);

        const newCharacter: Character = setCharacter.mock.calls[0][0] as Character;

        expect(newCharacter.gainedPerks).toEqual(character.gainedPerks);
    });
});
