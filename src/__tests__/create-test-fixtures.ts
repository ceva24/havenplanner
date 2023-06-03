const createTestSettings = (settingsDetailsToOverride?: Partial<Settings>): Settings => {
    const characterClass: CharacterClass = createTestCharacterClass(1, "Test Brute");

    const settings: Settings = {
        gameData: {
            game: {
                id: 0,
                name: "Gloomhaven Test",
            },
            initialCharacterClasses: [characterClass],
            unlockableCharacterClasses: [],
            personalQuests: [],
            enhancements: [],
            baseAttackModifierDeck: [],
            battleGoalCheckmarks: [{ id: 0, checkmarks: [{ id: 0, value: false }] }],
            itemGroups: [{ id: 1, name: "Random Item Designs" }],
            itemSlots: [{ id: 1, name: "Legs", imageUrl: "" }],
            defaultCharacter: createTestCharacter({ characterClass }),
        },
        spoilerSettings: {
            classes: [],
            items: {
                prosperity: 1,
                itemGroups: [],
            },
        },
        userSettings: {
            showPersonalQuest: false,
            selectedAbilityCardsTabIndex: 1,
            filteredItemSlots: [],
        },
    };

    return { ...settings, ...settingsDetailsToOverride };
};

const createTestSettingsWithItemSpoilers = (prosperity: number, itemGroups: ItemGroup[]): Settings => {
    return {
        ...createTestSettings(),
        spoilerSettings: {
            classes: [],
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
        battleGoalCheckmarkGroups: [{ id: 0, checkmarks: [{ id: 0, value: false }] }],
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
        initiallyLocked: false,
        spoilerSafeName: "",
        handSize: 10,
        abilityCards: [
            createTestAbilityCard(1, "1", "Trample"),
            createTestAbilityCard(2, "2", "Eye for an Eye"),
            createTestAbilityCard(3, "3", "Sweeping Blow"),
            createTestAbilityCard(4, "4", "Provoking Roar"),
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

const createTestAbilityCard = (
    id: number,
    level: string,
    name?: string,
    enhancementSlots?: EnhancementSlot[],
    imageUrl?: string
    // eslint-disable-next-line max-params
): AbilityCard => {
    return {
        id,
        name: name ?? "",
        level,
        imageUrl: imageUrl ?? "",
        enhancementSlots: enhancementSlots ?? [],
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

const createTestItem = (
    id: number,
    name: string,
    group: string,
    slot?: string,
    imageUrl?: string,
    alternativeImageUrl?: string
    // eslint-disable-next-line max-params
): Item => {
    return {
        id,
        name,
        imageUrl: imageUrl ?? "",
        slot: slot ?? "Head",
        group,
        alternativeImageUrl: alternativeImageUrl ?? "",
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
    createTestSettingsWithItemSpoilers,
    createTestCharacter,
    createTestCharacterClass,
    createTestAbilityCard,
    createTestPersonalQuest,
    createTestEnhancement,
    createTestAttackModifierDeckCard,
    createTestItem,
    createTestItemGroup,
};
