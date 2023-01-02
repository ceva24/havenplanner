const createTestCharacter = (characterDetailsToOverride?: Partial<Character>): Character => {
    const character: Character = {
        name: "My Char",
        experience: 100,
        gold: 50,
        notes: "Hello haven",
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
        battleGoalCheckmarkGroups: [],
        items: [],
    };

    return { ...character, ...characterDetailsToOverride };
};

export { createTestCharacter };
