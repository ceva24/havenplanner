import { render, screen } from "@testing-library/react";
import ExperienceField, { filterInvalidUnlockedAbilityCardsOnLevelChange } from "@/components/profile/experience-field";
import { characterClasses } from "@/utils/constants";

const character: Character = {
    name: "My Char",
    experience: 25,
    gold: 50,
    notes: "Hello haven",
    characterClass: characterClasses[0],
    items: [],
    unlockedAbilityCards: [],
};

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
                imageUrl: "/worldhaven/images/character-ability-cards/gloomhaven/BR/gh-fatal-advance.webp",
            },
        ];

        const result = filterInvalidUnlockedAbilityCardsOnLevelChange(abilityCards, 3);

        expect(result).toEqual(abilityCards);
    });

    it("has no effect on unlocked ability cards when character level does not change", () => {
        const abilityCards: AbilityCard[] = [
            {
                id: 14,
                name: "Fatal Advance",
                level: "2",
                imageUrl: "/worldhaven/images/character-ability-cards/gloomhaven/BR/gh-fatal-advance.webp",
            },
        ];

        const result = filterInvalidUnlockedAbilityCardsOnLevelChange(abilityCards, 2);

        expect(result).toEqual(abilityCards);
    });

    it("removes an unlocked ability card for a higher level when the character level decreases", () => {
        const abilityCards: AbilityCard[] = [
            {
                id: 14,
                name: "Fatal Advance",
                level: "2",
                imageUrl: "/worldhaven/images/character-ability-cards/gloomhaven/BR/gh-fatal-advance.webp",
            },
            {
                id: 16,
                name: "Hook and Chain",
                level: "3",
                imageUrl: "/worldhaven/images/character-ability-cards/gloomhaven/BR/gh-hook-and-chain.webp",
            },
        ];

        const result = filterInvalidUnlockedAbilityCardsOnLevelChange(abilityCards, 2);

        expect(result).toHaveLength(1);
        expect(result[0]).toEqual(abilityCards[0]);
    });

    it("removes all unlocked ability cards when the character level decreases to 1", () => {
        const abilityCards: AbilityCard[] = [
            {
                id: 14,
                name: "Fatal Advance",
                level: "2",
                imageUrl: "/worldhaven/images/character-ability-cards/gloomhaven/BR/gh-fatal-advance.webp",
            },
            {
                id: 16,
                name: "Hook and Chain",
                level: "3",
                imageUrl: "/worldhaven/images/character-ability-cards/gloomhaven/BR/gh-hook-and-chain.webp",
            },
        ];

        const result = filterInvalidUnlockedAbilityCardsOnLevelChange(abilityCards, 1);

        expect(result).toHaveLength(0);
    });

    it("removes the most recent unlocked ability card for the new current level when decreasing character level and both cards at the new level are unlocked", () => {
        const abilityCards: AbilityCard[] = [
            {
                id: 17,
                name: "Brute Force",
                level: "3",
                imageUrl: "/worldhaven/images/character-ability-cards/gloomhaven/BR/gh-brute-force.webp",
            },
            {
                id: 16,
                name: "Hook and Chain",
                level: "3",
                imageUrl: "/worldhaven/images/character-ability-cards/gloomhaven/BR/gh-hook-and-chain.webp",
            },
        ];

        const result = filterInvalidUnlockedAbilityCardsOnLevelChange(abilityCards, 3);

        expect(result).toHaveLength(1);
        expect(result[0]).toEqual(abilityCards[0]);
    });

    it("removes cards starting from the most recently selected when the maximum number of unlocks is exceeded when decreasing character level", () => {
        const abilityCards: AbilityCard[] = [
            {
                id: 14,
                name: "Fatal Advance",
                level: "2",
                imageUrl: "/worldhaven/images/character-ability-cards/gloomhaven/BR/gh-fatal-advance.webp",
            },
            {
                id: 16,
                name: "Hook and Chain",
                level: "3",
                imageUrl: "/worldhaven/images/character-ability-cards/gloomhaven/BR/gh-hook-and-chain.webp",
            },
            {
                id: 15,
                name: "Juggernaut",
                level: "2",
                imageUrl: "/worldhaven/images/character-ability-cards/gloomhaven/BR/gh-juggernaut.webp",
            },
        ];

        const result = filterInvalidUnlockedAbilityCardsOnLevelChange(abilityCards, 3);

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
                imageUrl: "/worldhaven/images/character-ability-cards/gloomhaven/BR/gh-crippling-offensive.webp",
            },
            {
                id: 17,
                name: "Brute Force",
                level: "3",
                imageUrl: "/worldhaven/images/character-ability-cards/gloomhaven/BR/gh-brute-force.webp",
            },
            {
                id: 22,
                name: "Quietus",
                level: "6",
                imageUrl: "/worldhaven/images/character-ability-cards/gloomhaven/BR/gh-quietus.webp",
            },
            {
                id: 15,
                name: "Juggernaut",
                level: "2",
                imageUrl: "/worldhaven/images/character-ability-cards/gloomhaven/BR/gh-juggernaut.webp",
            },
            {
                id: 16,
                name: "Hook and Chain",
                level: "3",
                imageUrl: "/worldhaven/images/character-ability-cards/gloomhaven/BR/gh-hook-and-chain.webp",
            },
            {
                id: 14,
                name: "Fatal Advance",
                level: "2",
                imageUrl: "/worldhaven/images/character-ability-cards/gloomhaven/BR/gh-fatal-advance.webp",
            },
        ];

        const result = filterInvalidUnlockedAbilityCardsOnLevelChange(abilityCards, 3);

        expect(result).toHaveLength(2);
        expect(result[0]).toEqual(abilityCards[1]);
        expect(result[1]).toEqual(abilityCards[3]);
    });
});
