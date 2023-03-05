const createTestSettings = (settingsDetailsToOverride?: Partial<Settings>): Settings => {
    const settings: Settings = {
        gameData: {
            game: {
                id: 0,
                name: "Gloomhaven Test",
            },
            characterClasses: [],
            personalQuests: [],
            enhancements: [],
            baseAttackModifierDeck: [],
            battleGoalCheckmarks: [{ id: 1, checkmarks: [{ id: 1, value: false }] }],
            items: [],
            itemGroups: [{ id: 1, name: "Random Item Designs" }],
            defaultCharacter: createTestCharacter(),
        },
        showPersonalQuest: false,
        selectedAbilityCardsTabIndex: 1,
        spoilerSettings: {
            items: {
                prosperity: 1,
                itemGroups: [],
            },
        },
    };

    return { ...settings, ...settingsDetailsToOverride };
};

const createTestSettingsWithSpoilerSettings = (prosperity: number, itemGroups: ItemGroup[]): Settings => {
    return {
        ...createTestSettings(),

        spoilerSettings: {
            items: {
                prosperity,
                itemGroups,
            },
        },
    };
};

const createTestCharacter = (characterDetailsToOverride?: Partial<Character>): Character => {
    const character: Character = {
        name: "My Char",
        experience: 100,
        gold: 50,
        notes: "Hello haven",
        characterClass: createTestCharacterClass(1, "Test Brute"),
        unlockedAbilityCards: [],
        hand: [],
        gainedEnhancements: [],
        gainedPerks: [],
        battleGoalCheckmarkGroups: [{ id: 1, checkmarks: [{ id: 1, value: false }] }],
        items: [],
    };

    return { ...character, ...characterDetailsToOverride };
};

const createTestCharacterClass = (id: number, name: string): CharacterClass => {
    return {
        id,
        name,
        imageUrl: "",
        characterMatFrontImageUrl: "",
        characterMatBackImageUrl: "",
        cardBackImageUrl: "",
        handSize: 10,
        abilityCards: [
            {
                id: 1,
                name: "Trample",
                level: "1",
                imageUrl: "/character-ability-cards/gloomhaven/BR/gh-trample.webp",
                enhancementSlots: [
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
                    {
                        id: 2,
                        name: "Move",
                        types: ["test-numeric", "test-main-line", "test-move"],
                    },
                    {
                        id: 3,
                        name: "Attack",
                        types: ["test-numeric", "test-main-line-targets-enemies"],
                    },
                    {
                        id: 4,
                        name: "Attack",
                        types: ["test-numeric", "test-main-line-targets-enemies"],
                    },
                ],
            },
            {
                id: 2,
                name: "Eye for an Eye",
                level: "2",
                imageUrl: "/character-ability-cards/gloomhaven/BR/gh-eye-for-an-eye.webp",
                enhancementSlots: [
                    {
                        id: 0,
                        name: "RETALIATE",
                        types: ["test-numeric", "test-main-line-targets-allies-or-self"],
                    },
                    {
                        id: 1,
                        name: "Heal",
                        types: ["test-numeric", "test-main-line-targets-allies-or-self"],
                    },
                    {
                        id: 2,
                        name: "Heal",
                        types: ["test-numeric", "test-main-line-targets-allies-or-self"],
                    },
                ],
            },
            {
                id: 3,
                name: "Sweeping Blow",
                level: "3",
                imageUrl: "/character-ability-cards/gloomhaven/BR/gh-sweeping-blow.webp",
                enhancementSlots: [
                    {
                        id: 0,
                        name: "Attack",
                        types: ["test-numeric", "test-main-line-targets-enemies"],
                    },
                    {
                        id: 1,
                        name: "Area attack",
                        types: ["test-area-attack"],
                    },
                    {
                        id: 2,
                        name: "PUSH",
                        types: ["test-numeric", "test-main-line-targets-enemies"],
                    },
                ],
            },
            {
                id: 4,
                name: "Provoking Roar",
                level: "4",
                imageUrl: "/character-ability-cards/gloomhaven/BR/gh-provoking-roar.webp",
                enhancementSlots: [
                    {
                        id: 0,
                        name: "Attack",
                        types: ["test-numeric", "test-main-line-targets-enemies"],
                    },
                ],
            },
        ],
        perks: [
            {
                id: 0,
                name: "Remove two <-1> cards",
                count: 1,
                add: [],
                remove: [],
            },
        ],
    };
};

const createTestPersonalQuest = (id: number, name: string): PersonalQuest => {
    return {
        id,
        name,
        imageUrl: "",
    };
};

const createTestEnhancement = (id: number, name: string, validSlotTypes: string[]): Enhancement => {
    return {
        id,
        name,
        imageUrl: "",
        validSlotTypes,
    };
};

const createTestAttackModifierDeckCard = (id: number, name: string, count?: number): AttackModifierDeckCard => {
    return {
        card: {
            id,
            name,
            imageUrl: "",
        },
        count: count ?? 1,
    };
};

const createTestItem = (id: number, name: string, group: string, slot?: string): Item => {
    return {
        id,
        name,
        imageUrl: "",
        slot: slot ?? "Head",
        slotImageUrl: "",
        group,
    };
};

const createTestItemGroup = (id: number, name: string): ItemGroup => {
    return {
        id,
        name,
    };
};

export {
    createTestSettings,
    createTestSettingsWithSpoilerSettings,
    createTestCharacter,
    createTestCharacterClass,
    createTestPersonalQuest,
    createTestEnhancement,
    createTestAttackModifierDeckCard,
    createTestItem,
    createTestItemGroup,
};
