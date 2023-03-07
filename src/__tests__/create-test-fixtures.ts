const createTestSettings = (settingsDetailsToOverride?: Partial<Settings>): Settings => {
    const characterClass: CharacterClass = createTestCharacterClass(1, "Test Brute");

    const settings: Settings = {
        gameData: {
            game: {
                id: 0,
                name: "Gloomhaven Test",
            },
            characterClasses: [characterClass],
            personalQuests: [],
            enhancements: [],
            baseAttackModifierDeck: [],
            battleGoalCheckmarks: [{ id: 1, checkmarks: [{ id: 1, value: false }] }],
            items: [],
            itemGroups: [{ id: 1, name: "Random Item Designs" }],
            defaultCharacter: createTestCharacter({ characterClass }),
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
    createTestAbilityCard,
    createTestPersonalQuest,
    createTestEnhancement,
    createTestAttackModifierDeckCard,
    createTestItem,
    createTestItemGroup,
};