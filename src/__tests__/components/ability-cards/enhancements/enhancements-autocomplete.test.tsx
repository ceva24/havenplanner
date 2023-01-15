/* eslint-disable @typescript-eslint/ban-types */
import { render, screen } from "@testing-library/react";
import EnhancementsAutocomplete, {
    gainOrRemoveEnhancement,
    getEnhancementSlotValue,
    getPossibleEnhancementsFor,
} from "@/components/ability-cards/enhancements/enhancements-autocomplete";
import { enhancements } from "@/loaders/enhancements";
import { createTestCharacter } from "@/testutils";

const character = createTestCharacter();
character.gainedEnhancements = [
    { abilityCard: character.characterClass.abilityCards[0], slot: 0, enhancement: enhancements[0] },
];

const setCharacter = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
});

describe("enhancements autocomplete", () => {
    it("renders", () => {
        render(
            <EnhancementsAutocomplete
                slotType="Attack"
                abilityCard={character.characterClass.abilityCards[0]}
                slot={1}
                character={character}
                setCharacter={setCharacter}
            />
        );

        const enhancementsAutocomplete = screen.queryByRole("combobox");

        expect(enhancementsAutocomplete).toBeInTheDocument();
    });
});

describe("getEnhancementSlotValue", () => {
    it("returns the enhancement matching the card and slot", () => {
        const enhancement: Enhancement | null = getEnhancementSlotValue(
            character,
            character.characterClass.abilityCards[0],
            0
        );

        expect(enhancement).toEqual(character.gainedEnhancements[0].enhancement);
    });

    it("returns null when no matching gained enhancement is found", () => {
        const enhancement: Enhancement | null = getEnhancementSlotValue(
            character,
            character.characterClass.abilityCards[0],
            1
        );

        expect(enhancement).toBeNull();
    });

    it("does not return an enhancement for the same ability card but a different slot", () => {
        const enhancement: Enhancement | null = getEnhancementSlotValue(
            character,
            character.characterClass.abilityCards[0],
            1
        );

        expect(enhancement).not.toEqual(character.gainedEnhancements[0].enhancement);
    });

    it("does not return an enhancement for the same slot but a different ability card", () => {
        const enhancement: Enhancement | null = getEnhancementSlotValue(
            character,
            character.characterClass.abilityCards[1],
            0
        );

        expect(enhancement).not.toEqual(character.gainedEnhancements[0].enhancement);
    });
});

describe("getPossibleEnhancementsFor", () => {
    it("filters the list of enhancements to valid slot types", () => {
        const enhancements: Enhancement[] = getPossibleEnhancementsFor("Move");

        const enhancementNames = enhancements.map((enhancement: Enhancement) => enhancement.name);

        expect(enhancementNames).toContain("+1");
        expect(enhancementNames).toContain("Jump");
    });
});

describe("gainOrRemoveEnhancement", () => {
    it("gains an enhancement", () => {
        const enhancement = enhancements[0];
        const abilityCard = character.characterClass.abilityCards[0];
        const slot = 0;

        gainOrRemoveEnhancement(enhancement, abilityCard, slot, character, setCharacter);

        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            gainedEnhancements: [
                {
                    enhancement,
                    abilityCard,
                    slot,
                },
            ],
        });
    });

    it("removes an enhancement", () => {
        const abilityCard = character.characterClass.abilityCards[0];
        const slot = 0;

        character.gainedEnhancements = [
            {
                enhancement: enhancements[0],
                abilityCard,
                slot,
            },
        ];

        gainOrRemoveEnhancement(null, abilityCard, slot, character, setCharacter);

        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            gainedEnhancements: [],
        });
    });

    it("updates an enhancement", () => {
        const enhancement = enhancements[9];
        const abilityCard = character.characterClass.abilityCards[0];
        const slot = 0;

        character.gainedEnhancements = [
            {
                enhancement: enhancements[0],
                abilityCard,
                slot,
            },
        ];

        gainOrRemoveEnhancement(enhancement, abilityCard, slot, character, setCharacter);

        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            gainedEnhancements: [
                {
                    enhancement,
                    abilityCard,
                    slot,
                },
            ],
        });
    });
});
