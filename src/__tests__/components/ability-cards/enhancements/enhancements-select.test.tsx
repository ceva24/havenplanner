import { render, screen } from "@testing-library/react";
import EnhancementsSelect, {
    gainOrRemoveEnhancement,
    getEnhancementSlotValue,
} from "@/components/ability-cards/enhancements/enhancements-select";
import { enhancements } from "@/loaders/enhancements";
import { createTestCharacter } from "@/testutils";

const character = createTestCharacter();
character.gainedEnhancements = [
    {
        abilityCard: character.characterClass.abilityCards[0],
        enhancementSlot: character.characterClass.abilityCards[0].enhancementSlots[0],
        enhancement: enhancements[0],
    },
];

const setCharacter = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
});

describe("enhancements select", () => {
    it("renders", () => {
        render(
            <EnhancementsSelect
                abilityCard={character.characterClass.abilityCards[0]}
                enhancementSlot={character.characterClass.abilityCards[0].enhancementSlots[1]}
                character={character}
                setCharacter={setCharacter}
            />
        );

        const enhancementsSelect = screen.queryByRole("button", { name: "PIERCE" });

        expect(enhancementsSelect).toBeInTheDocument();
    });
});

describe("getEnhancementSlotValue", () => {
    it("returns the enhancement matching the card and slot", () => {
        const enhancementId: number | "" = getEnhancementSlotValue(
            character,
            character.characterClass.abilityCards[0],
            character.characterClass.abilityCards[0].enhancementSlots[0]
        );

        expect(enhancementId).toEqual(character.gainedEnhancements[0].enhancement.id);
    });

    it("returns null when no matching gained enhancement is found", () => {
        const enhancementId: number | "" = getEnhancementSlotValue(
            character,
            character.characterClass.abilityCards[0],
            character.characterClass.abilityCards[0].enhancementSlots[1]
        );

        expect(enhancementId).toEqual("");
    });

    it("does not return an enhancement for the same ability card but a different slot", () => {
        const enhancementId: number | "" = getEnhancementSlotValue(
            character,
            character.characterClass.abilityCards[0],
            character.characterClass.abilityCards[0].enhancementSlots[1]
        );

        expect(enhancementId).not.toEqual(character.gainedEnhancements[0].enhancement.id);
    });

    it("does not return an enhancement for the same slot but a different ability card", () => {
        const enhancementId: number | "" = getEnhancementSlotValue(
            character,
            character.characterClass.abilityCards[1],
            character.characterClass.abilityCards[1].enhancementSlots[0]
        );

        expect(enhancementId).not.toEqual(character.gainedEnhancements[0].enhancement.id);
    });
});

describe("gainOrRemoveEnhancement", () => {
    it("gains an enhancement", () => {
        const enhancement = enhancements[0];
        const abilityCard = character.characterClass.abilityCards[0];
        const enhancementSlot = character.characterClass.abilityCards[0].enhancementSlots[0];

        gainOrRemoveEnhancement(enhancement.id, abilityCard, enhancementSlot, character, setCharacter);

        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            gainedEnhancements: [
                {
                    enhancement,
                    abilityCard,
                    enhancementSlot,
                },
            ],
        });
    });

    it("removes an enhancement", () => {
        const abilityCard = character.characterClass.abilityCards[0];
        const enhancementSlot = character.characterClass.abilityCards[0].enhancementSlots[0];

        character.gainedEnhancements = [
            {
                enhancement: enhancements[0],
                abilityCard,
                enhancementSlot,
            },
        ];

        gainOrRemoveEnhancement("", abilityCard, enhancementSlot, character, setCharacter);

        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            gainedEnhancements: [],
        });
    });

    it("updates an enhancement", () => {
        const enhancement = enhancements[9];
        const abilityCard = character.characterClass.abilityCards[0];
        const enhancementSlot = character.characterClass.abilityCards[0].enhancementSlots[0];

        character.gainedEnhancements = [
            {
                enhancement: enhancements[0],
                abilityCard,
                enhancementSlot,
            },
        ];

        gainOrRemoveEnhancement(enhancement.id, abilityCard, enhancementSlot, character, setCharacter);

        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            gainedEnhancements: [
                {
                    enhancement,
                    abilityCard,
                    enhancementSlot,
                },
            ],
        });
    });
});
