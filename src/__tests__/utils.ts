import { createDefaultBattleGoals } from "@/services/character";

const createTestCharacter = (characterDetailsToOverride?: Partial<Character>): Character => {
    const character: Character = {
        name: "My Char",
        experience: 100,
        gold: 50,
        notes: "Hello haven",
        characterClass: {
            id: 0,
            name: "Brute",
            imageUrl: "/character-icons/gloomhaven/gh-brute.webp",
            characterMatFrontImageUrl: "/character-mats/gloomhaven/gh-brute.webp",
            characterMatBackImageUrl: "/character-mats/gloomhaven/gh-brute-back.webp",
            cardBackImageUrl: "/character-ability-cards/gloomhaven/BR/gh-br-back.webp",
            handSize: 10,
            abilityCards: [
                {
                    id: 1,
                    name: "Trample",
                    level: "1",
                    imageUrl: "/character-ability-cards/gloomhaven/BR/gh-trample.webp",
                    enhancementSlots: [],
                },
                {
                    id: 2,
                    name: "Eye for an Eye",
                    level: "1",
                    imageUrl: "/character-ability-cards/gloomhaven/BR/gh-eye-for-an-eye.webp",
                    enhancementSlots: ["retaliate", "heal", "heal"],
                },
            ],
            perks: [
                {
                    description: "Remove two <-1> cards",
                    count: 1,
                    add: [],
                    remove: [],
                },
            ],
        },
        unlockedAbilityCards: [],
        hand: [],
        gainedEnhancements: [],
        gainedPerks: [],
        battleGoalCheckmarkGroups: createDefaultBattleGoals(),
        items: [],
    };

    return { ...character, ...characterDetailsToOverride };
};

export { createTestCharacter };
