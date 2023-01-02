import { render, screen } from "@testing-library/react";
import ExperienceField, { updateCardsInHand, updateUnlockedAbilityCards } from "@/components/profile/experience-field";
import { createTestCharacter } from "@/testutils";

const character: Character = createTestCharacter({ experience: 25 });

const setCharacter = jest.fn();

const handleChange = jest.fn();

describe("experience field", () => {
    it("renders", () => {
        render(<ExperienceField character={character} setCharacter={setCharacter} handleChange={handleChange} />);

        const experienceField = screen.queryByRole("textbox", { name: "Experience" });

        expect(experienceField).toBeInTheDocument();
        expect(experienceField).toHaveValue("25");
    });
});

describe("filterInvalidUnlockedAbilityCardsOnLevelChange", () => {
    it("has no effect on unlocked ability cards when increasing character level", () => {
        const abilityCards: AbilityCard[] = [
            {
                id: 14,
                name: "Fatal Advance",
                level: "2",
                imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-fatal-advance.webp",
                enhancementSlots: [],
            },
        ];

        const result = updateUnlockedAbilityCards(abilityCards, 3);

        expect(result).toEqual(abilityCards);
    });

    it("has no effect on unlocked ability cards when character level does not change", () => {
        const abilityCards: AbilityCard[] = [
            {
                id: 14,
                name: "Fatal Advance",
                level: "2",
                imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-fatal-advance.webp",
                enhancementSlots: [],
            },
        ];

        const result = updateUnlockedAbilityCards(abilityCards, 2);

        expect(result).toEqual(abilityCards);
    });

    it("removes an unlocked ability card for a higher level when the character level decreases", () => {
        const abilityCards: AbilityCard[] = [
            {
                id: 14,
                name: "Fatal Advance",
                level: "2",
                imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-fatal-advance.webp",
                enhancementSlots: [],
            },
            {
                id: 16,
                name: "Hook and Chain",
                level: "3",
                imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-hook-and-chain.webp",
                enhancementSlots: [],
            },
        ];

        const result = updateUnlockedAbilityCards(abilityCards, 2);

        expect(result).toHaveLength(1);
        expect(result[0]).toEqual(abilityCards[0]);
    });

    it("removes all unlocked ability cards when the character level decreases to 1", () => {
        const abilityCards: AbilityCard[] = [
            {
                id: 14,
                name: "Fatal Advance",
                level: "2",
                imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-fatal-advance.webp",
                enhancementSlots: [],
            },
            {
                id: 16,
                name: "Hook and Chain",
                level: "3",
                imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-hook-and-chain.webp",
                enhancementSlots: [],
            },
        ];

        const result = updateUnlockedAbilityCards(abilityCards, 1);

        expect(result).toHaveLength(0);
    });

    it("removes the most recent unlocked ability card for the new current level when decreasing character level and both cards at the new level are unlocked", () => {
        const abilityCards: AbilityCard[] = [
            {
                id: 17,
                name: "Brute Force",
                level: "3",
                imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-brute-force.webp",
                enhancementSlots: [],
            },
            {
                id: 16,
                name: "Hook and Chain",
                level: "3",
                imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-hook-and-chain.webp",
                enhancementSlots: [],
            },
        ];

        const result = updateUnlockedAbilityCards(abilityCards, 3);

        expect(result).toHaveLength(1);
        expect(result[0]).toEqual(abilityCards[0]);
    });

    it("removes cards starting from the most recently selected when the maximum number of unlocks is exceeded when decreasing character level", () => {
        const abilityCards: AbilityCard[] = [
            {
                id: 14,
                name: "Fatal Advance",
                level: "2",
                imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-fatal-advance.webp",
                enhancementSlots: [],
            },
            {
                id: 16,
                name: "Hook and Chain",
                level: "3",
                imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-hook-and-chain.webp",
                enhancementSlots: [],
            },
            {
                id: 15,
                name: "Juggernaut",
                level: "2",
                imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-juggernaut.webp",
                enhancementSlots: [],
            },
        ];

        const result = updateUnlockedAbilityCards(abilityCards, 3);

        expect(result).toHaveLength(2);
        expect(result[0]).toEqual(abilityCards[0]);
        expect(result[1]).toEqual(abilityCards[1]);
    });

    it("removes higher level cards, removes new current level unlocks and then removes recently selected cards exceeding the maximum number of unlocks when decreasing character level by a significant amount", () => {
        const abilityCards: AbilityCard[] = [
            {
                id: 25,
                name: "Crippling Offensive",
                level: "7",
                imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-crippling-offensive.webp",
                enhancementSlots: [],
            },
            {
                id: 17,
                name: "Brute Force",
                level: "3",
                imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-brute-force.webp",
                enhancementSlots: [],
            },
            {
                id: 22,
                name: "Quietus",
                level: "6",
                imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-quietus.webp",
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
                id: 16,
                name: "Hook and Chain",
                level: "3",
                imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-hook-and-chain.webp",
                enhancementSlots: [],
            },
            {
                id: 14,
                name: "Fatal Advance",
                level: "2",
                imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-fatal-advance.webp",
                enhancementSlots: [],
            },
        ];

        const result = updateUnlockedAbilityCards(abilityCards, 3);

        expect(result).toHaveLength(2);
        expect(result[0]).toEqual(abilityCards[1]);
        expect(result[1]).toEqual(abilityCards[3]);
    });
});

describe("filterInvalidCardsInHandOnLevelChange", () => {
    it("removes cards in the hand greater than the new level", () => {
        const hand: AbilityCard[] = [
            {
                id: 25,
                name: "Crippling Offensive",
                level: "7",
                imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-crippling-offensive.webp",
                enhancementSlots: [],
            },
            {
                id: 17,
                name: "Brute Force",
                level: "3",
                imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-brute-force.webp",
                enhancementSlots: [],
            },
            {
                id: 22,
                name: "Quietus",
                level: "6",
                imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-quietus.webp",
                enhancementSlots: [],
            },
            {
                id: 16,
                name: "Hook and Chain",
                level: "3",
                imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-hook-and-chain.webp",
                enhancementSlots: [],
            },
        ];

        const result = updateCardsInHand(hand, 2);

        expect(result).toHaveLength(0);
    });

    it("does not remove cards in hand equal to the new level", () => {
        const hand: AbilityCard[] = [
            {
                id: 25,
                name: "Crippling Offensive",
                level: "7",
                imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-crippling-offensive.webp",
                enhancementSlots: [],
            },
            {
                id: 17,
                name: "Brute Force",
                level: "3",
                imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-brute-force.webp",
                enhancementSlots: [],
            },
            {
                id: 22,
                name: "Quietus",
                level: "6",
                imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-quietus.webp",
                enhancementSlots: [],
            },
            {
                id: 16,
                name: "Hook and Chain",
                level: "3",
                imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-hook-and-chain.webp",
                enhancementSlots: [],
            },
        ];

        const result = updateCardsInHand(hand, 3);

        expect(result).toHaveLength(2);
        expect(result[0]).toEqual(hand[1]);
        expect(result[1]).toEqual(hand[3]);
    });

    it("does not remove cards in hand lower than the new level", () => {
        const hand: AbilityCard[] = [
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
        ];

        const result = updateCardsInHand(hand, 3);

        expect(result).toHaveLength(2);
        expect(result).toEqual(hand);
    });

    it("does not remove level X cards", () => {
        const hand: AbilityCard[] = [
            {
                id: 11,
                name: "Skewer",
                level: "X",
                imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-skewer.webp",
                enhancementSlots: [],
            },
        ];

        const result = updateCardsInHand(hand, 1);

        expect(result).toHaveLength(1);
        expect(result).toEqual(hand);
    });
});
