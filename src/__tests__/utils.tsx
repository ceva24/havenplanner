import type { ReactNode } from "react";
import SettingsProvider from "@/hooks/use-settings";

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
            battleGoalCheckmarks: [],
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
                    enhancementSlots: [
                        {
                            id: 0,
                            name: "Attack",
                            types: ["numeric", "main-line-targets-enemies"],
                        },
                        {
                            id: 1,
                            name: "PIERCE",
                            types: ["numeric"],
                        },
                        {
                            id: 2,
                            name: "Move",
                            types: ["numeric", "main-line", "move"],
                        },
                        {
                            id: 3,
                            name: "Attack",
                            types: ["numeric", "main-line-targets-enemies"],
                        },
                        {
                            id: 4,
                            name: "Attack",
                            types: ["numeric", "main-line-targets-enemies"],
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
                            types: ["numeric", "main-line-targets-allies-or-self"],
                        },
                        {
                            id: 1,
                            name: "Heal",
                            types: ["numeric", "main-line-targets-allies-or-self"],
                        },
                        {
                            id: 2,
                            name: "Heal",
                            types: ["numeric", "main-line-targets-allies-or-self"],
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
                            types: ["numeric", "main-line-targets-enemies"],
                        },
                        {
                            id: 1,
                            name: "Area attack",
                            types: ["area-attack"],
                        },
                        {
                            id: 2,
                            name: "PUSH",
                            types: ["numeric", "main-line-targets-enemies"],
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
                            types: ["numeric", "main-line-targets-enemies"],
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

interface TestSettingsProviderProps {
    children: ReactNode;
    settings?: Settings;
}

const TestSettingsProvider = ({ settings, children }: TestSettingsProviderProps) => {
    return (
        <SettingsProvider settings={settings ?? createTestSettings()} setSettings={jest.fn()}>
            {children}
        </SettingsProvider>
    );
};

export {
    createTestSettings,
    createTestSettingsWithSpoilerSettings,
    createTestCharacter,
    TestSettingsProvider,
    createTestItem,
    createTestItemGroup,
};
