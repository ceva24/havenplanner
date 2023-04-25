import {
    calculateLevel,
    getExperienceForLevel,
    updateHand,
    updateUnlockedAbilityCards,
} from "@/client/services/profile";

describe("calculateLevel", () => {
    interface ExperienceLevelProps {
        experience: number;
        level: number;
    }

    it.each`
        experience    | level
        ${0}          | ${1}
        ${44}         | ${1}
        ${45}         | ${2}
        ${46}         | ${2}
        ${95}         | ${3}
        ${150}        | ${4}
        ${210}        | ${5}
        ${275}        | ${6}
        ${345}        | ${7}
        ${420}        | ${8}
        ${499}        | ${8}
        ${500}        | ${9}
        ${501}        | ${9}
        ${9_000_000}  | ${9}
        ${-45}        | ${1}
        ${Number.NaN} | ${1}
    `("returns $level when the experience is $experience", ({ experience, level }: ExperienceLevelProps) => {
        expect(calculateLevel(experience)).toEqual(level);
    });
});

describe("getExperienceForLevel", () => {
    interface ExperienceLevelProps {
        experience: number;
        level: number;
    }

    it.each`
        level | experience
        ${1}  | ${0}
        ${2}  | ${45}
        ${3}  | ${95}
        ${4}  | ${150}
        ${5}  | ${210}
        ${6}  | ${275}
        ${7}  | ${345}
        ${8}  | ${420}
        ${9}  | ${500}
        ${-1} | ${0}
        ${10} | ${0}
        ${99} | ${0}
    `("returns $experience when the level is $level", ({ level, experience }: ExperienceLevelProps) => {
        expect(getExperienceForLevel(level)).toEqual(experience);
    });
});

describe("updateUnlockedAbilityCards", () => {
    it("has no effect on unlocked ability cards when increasing character level", () => {
        const abilityCards: AbilityCard[] = [
            {
                id: 14,
                name: "Fatal Advance",
                level: "2",
                imageUrl: "/character-ability-cards/gloomhaven/BR/gh-fatal-advance.webp",
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
                imageUrl: "/character-ability-cards/gloomhaven/BR/gh-fatal-advance.webp",
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
                imageUrl: "/character-ability-cards/gloomhaven/BR/gh-fatal-advance.webp",
                enhancementSlots: [],
            },
            {
                id: 16,
                name: "Hook and Chain",
                level: "3",
                imageUrl: "/character-ability-cards/gloomhaven/BR/gh-hook-and-chain.webp",
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
                imageUrl: "/character-ability-cards/gloomhaven/BR/gh-fatal-advance.webp",
                enhancementSlots: [],
            },
            {
                id: 16,
                name: "Hook and Chain",
                level: "3",
                imageUrl: "/character-ability-cards/gloomhaven/BR/gh-hook-and-chain.webp",
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
                imageUrl: "/character-ability-cards/gloomhaven/BR/gh-brute-force.webp",
                enhancementSlots: [],
            },
            {
                id: 16,
                name: "Hook and Chain",
                level: "3",
                imageUrl: "/character-ability-cards/gloomhaven/BR/gh-hook-and-chain.webp",
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
                imageUrl: "/character-ability-cards/gloomhaven/BR/gh-fatal-advance.webp",
                enhancementSlots: [],
            },
            {
                id: 16,
                name: "Hook and Chain",
                level: "3",
                imageUrl: "/character-ability-cards/gloomhaven/BR/gh-hook-and-chain.webp",
                enhancementSlots: [],
            },
            {
                id: 15,
                name: "Juggernaut",
                level: "2",
                imageUrl: "/character-ability-cards/gloomhaven/BR/gh-juggernaut.webp",
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
                imageUrl: "/character-ability-cards/gloomhaven/BR/gh-crippling-offensive.webp",
                enhancementSlots: [],
            },
            {
                id: 17,
                name: "Brute Force",
                level: "3",
                imageUrl: "/character-ability-cards/gloomhaven/BR/gh-brute-force.webp",
                enhancementSlots: [],
            },
            {
                id: 22,
                name: "Quietus",
                level: "6",
                imageUrl: "/character-ability-cards/gloomhaven/BR/gh-quietus.webp",
                enhancementSlots: [],
            },
            {
                id: 15,
                name: "Juggernaut",
                level: "2",
                imageUrl: "/character-ability-cards/gloomhaven/BR/gh-juggernaut.webp",
                enhancementSlots: [],
            },
            {
                id: 16,
                name: "Hook and Chain",
                level: "3",
                imageUrl: "/character-ability-cards/gloomhaven/BR/gh-hook-and-chain.webp",
                enhancementSlots: [],
            },
            {
                id: 14,
                name: "Fatal Advance",
                level: "2",
                imageUrl: "/character-ability-cards/gloomhaven/BR/gh-fatal-advance.webp",
                enhancementSlots: [],
            },
        ];

        const result = updateUnlockedAbilityCards(abilityCards, 3);

        expect(result).toHaveLength(2);
        expect(result[0]).toEqual(abilityCards[1]);
        expect(result[1]).toEqual(abilityCards[3]);
    });
});

describe("updateHand", () => {
    it("removes cards in the hand greater than the new level", () => {
        const hand: AbilityCard[] = [
            {
                id: 25,
                name: "Crippling Offensive",
                level: "7",
                imageUrl: "/character-ability-cards/gloomhaven/BR/gh-crippling-offensive.webp",
                enhancementSlots: [],
            },
            {
                id: 17,
                name: "Brute Force",
                level: "3",
                imageUrl: "/character-ability-cards/gloomhaven/BR/gh-brute-force.webp",
                enhancementSlots: [],
            },
            {
                id: 22,
                name: "Quietus",
                level: "6",
                imageUrl: "/character-ability-cards/gloomhaven/BR/gh-quietus.webp",
                enhancementSlots: [],
            },
            {
                id: 16,
                name: "Hook and Chain",
                level: "3",
                imageUrl: "/character-ability-cards/gloomhaven/BR/gh-hook-and-chain.webp",
                enhancementSlots: [],
            },
        ];

        const result = updateHand(hand, 2);

        expect(result).toHaveLength(0);
    });

    it("does not remove cards in hand equal to the new level", () => {
        const hand: AbilityCard[] = [
            {
                id: 25,
                name: "Crippling Offensive",
                level: "7",
                imageUrl: "/character-ability-cards/gloomhaven/BR/gh-crippling-offensive.webp",
                enhancementSlots: [],
            },
            {
                id: 17,
                name: "Brute Force",
                level: "3",
                imageUrl: "/character-ability-cards/gloomhaven/BR/gh-brute-force.webp",
                enhancementSlots: [],
            },
            {
                id: 22,
                name: "Quietus",
                level: "6",
                imageUrl: "/character-ability-cards/gloomhaven/BR/gh-quietus.webp",
                enhancementSlots: [],
            },
            {
                id: 16,
                name: "Hook and Chain",
                level: "3",
                imageUrl: "/character-ability-cards/gloomhaven/BR/gh-hook-and-chain.webp",
                enhancementSlots: [],
            },
        ];

        const result = updateHand(hand, 3);

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
                imageUrl: "/character-ability-cards/gloomhaven/BR/gh-trample.webp",
                enhancementSlots: [],
            },
            {
                id: 15,
                name: "Juggernaut",
                level: "2",
                imageUrl: "/character-ability-cards/gloomhaven/BR/gh-juggernaut.webp",
                enhancementSlots: [],
            },
        ];

        const result = updateHand(hand, 3);

        expect(result).toHaveLength(2);
        expect(result).toEqual(hand);
    });

    it("does not remove level X cards", () => {
        const hand: AbilityCard[] = [
            {
                id: 11,
                name: "Skewer",
                level: "X",
                imageUrl: "/character-ability-cards/gloomhaven/BR/gh-skewer.webp",
                enhancementSlots: [],
            },
        ];

        const result = updateHand(hand, 1);

        expect(result).toHaveLength(1);
        expect(result).toEqual(hand);
    });
});
