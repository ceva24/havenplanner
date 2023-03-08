import { render, screen } from "@testing-library/react";
import EnhancementsSelect, {
    gainOrRemoveEnhancement,
    getEnhancementSlotValue,
} from "@/components/ability-cards/enhancements/enhancements-select";
import {
    createTestAbilityCard,
    createTestCharacter,
    createTestEnhancement,
    createTestSettings,
} from "@/test/create-test-fixtures";
import { TestSettingsProvider } from "@/test/test-settings-provider";

const character: Character = createTestCharacter();

const setCharacter = jest.fn();

const settings: Settings = createTestSettings();

beforeAll(() => {
    settings.gameData.enhancements = [
        createTestEnhancement(1, "Test Fire", ["test-numeric"]),
        createTestEnhancement(2, "Test Ice", ["test-numeric"]),
    ];

    character.characterClass.abilityCards = [
        createTestAbilityCard(1, "1", "", [
            {
                id: 0,
                name: "Attack",
                types: ["test-numeric", "test-main-line-targets-enemies"],
            },
            {
                id: 1,
                name: "PIERCE",
                types: ["test-numeric"],
            },
        ]),
        createTestAbilityCard(2, "2", "", [
            {
                id: 0,
                name: "Attack",
                types: ["test-numeric", "test-main-line-targets-enemies"],
            },
        ]),
    ];

    character.gainedEnhancements = [
        {
            abilityCard: character.characterClass.abilityCards[0],
            enhancementSlot: character.characterClass.abilityCards[0].enhancementSlots[0],
            enhancement: settings.gameData.enhancements[0],
        },
    ];
});

beforeEach(() => {
    jest.clearAllMocks();
});

describe("enhancements select", () => {
    it("renders", () => {
        render(
            <TestSettingsProvider settings={settings}>
                <EnhancementsSelect
                    abilityCard={character.characterClass.abilityCards[0]}
                    enhancementSlot={character.characterClass.abilityCards[0].enhancementSlots[0]}
                    character={character}
                    setCharacter={setCharacter}
                />
            </TestSettingsProvider>
        );

        const enhancementsSelect = screen.queryByRole("button", { name: "Attack" });

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
        const enhancement = settings.gameData.enhancements[0];
        const abilityCard = character.characterClass.abilityCards[0];
        const enhancementSlot = character.characterClass.abilityCards[0].enhancementSlots[0];

        gainOrRemoveEnhancement(
            enhancement.id,
            abilityCard,
            enhancementSlot,
            settings.gameData.enhancements,
            character,
            setCharacter
        );

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
                enhancement: settings.gameData.enhancements[0],
                abilityCard,
                enhancementSlot,
            },
        ];

        gainOrRemoveEnhancement(
            "",
            abilityCard,
            enhancementSlot,
            settings.gameData.enhancements,
            character,
            setCharacter
        );

        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            gainedEnhancements: [],
        });
    });

    it("updates an enhancement", () => {
        const enhancement = settings.gameData.enhancements[1];
        const abilityCard = character.characterClass.abilityCards[0];
        const enhancementSlot = character.characterClass.abilityCards[0].enhancementSlots[0];

        character.gainedEnhancements = [
            {
                enhancement: settings.gameData.enhancements[0],
                abilityCard,
                enhancementSlot,
            },
        ];

        gainOrRemoveEnhancement(
            enhancement.id,
            abilityCard,
            enhancementSlot,
            settings.gameData.enhancements,
            character,
            setCharacter
        );

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
