import { Checkbox } from "@mui/material";
import { render, screen } from "@testing-library/react";
import PerkLabel, { removeGainedPerksForPerk } from "@/components/perks/perk-label";
import { createTestCharacter } from "@/testutils";

const setCharacter = jest.fn();

beforeEach(() => {
    jest.resetAllMocks();
});

describe("perk-label", () => {
    it("renders with the correct label id and description", () => {
        const labelId = "abc";
        const character = createTestCharacter();
        const perk = character.characterClass.perks[0];

        render(
            <>
                <Checkbox inputProps={{ "aria-labelledby": labelId }} />
                <PerkLabel perk={perk} labelId={labelId} character={character} setCharacter={setCharacter} />
            </>
        );

        const checkbox = screen.queryByRole("checkbox", { name: perk.name });

        expect(checkbox).toBeInTheDocument();
    });
});

describe("removeGainedPerksForPerk", () => {
    it("removes a perk", () => {
        const character = createTestCharacter();
        const perk = character.characterClass.perks[0];
        character.gainedPerks = [{ perk, checkboxIndex: 0 }];

        removeGainedPerksForPerk(perk, character, setCharacter);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            gainedPerks: [],
        });
    });

    it("removes multiple perks", () => {
        const character = createTestCharacter();
        const perk: Perk = {
            id: 0,
            name: "Remove two <-1> cards",
            count: 3,
            add: [],
            remove: [],
        };

        character.characterClass.perks = [perk];
        character.gainedPerks = [
            { perk, checkboxIndex: 0 },
            { perk, checkboxIndex: 2 },
        ];

        removeGainedPerksForPerk(perk, character, setCharacter);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            gainedPerks: [],
        });
    });
});
