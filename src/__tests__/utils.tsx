import type { ReactNode } from "react";
import AppSettingsProvider from "@/hooks/use-app-settings";
import { defaultAppSettings } from "@/constants";
import { createDefaultBattleGoals } from "@/services/perks/battle-goal";

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
        battleGoalCheckmarkGroups: createDefaultBattleGoals(),
        items: [],
    };

    return { ...character, ...characterDetailsToOverride };
};

const createTestAppSettings = (appSettingsDetailsToOverride?: Partial<AppSettings>): AppSettings => {
    const appSettings: AppSettings = {
        showPersonalQuest: false,
        selectedAbilityCardsTabIndex: 1,
        spoilerSettings: createTestItemSpoilerSettings(),
    };

    return { ...appSettings, ...appSettingsDetailsToOverride };
};

const createTestItemSpoilerSettings = (prosperity?: number, itemGroups?: ItemGroup[]): SpoilerSettings => {
    return {
        items: {
            prosperity: prosperity ?? 1,
            itemGroups: itemGroups ?? [],
        },
    };
};

interface TestAppSettingsProviderProps {
    children: ReactNode;
    appSettings?: AppSettings;
}

const TestAppSettingsProvider = ({ appSettings, children }: TestAppSettingsProviderProps) => {
    return (
        <AppSettingsProvider appSettings={appSettings ?? defaultAppSettings} setAppSettings={jest.fn()}>
            {children}
        </AppSettingsProvider>
    );
};

export { createTestCharacter, createTestAppSettings, createTestItemSpoilerSettings, TestAppSettingsProvider };
