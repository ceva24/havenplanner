import { attackModifiers } from "@/loaders/gloomhaven/attack-modifiers";
import { characterClasses } from "@/loaders/gloomhaven/character-classes";
import { enhancements } from "@/loaders/gloomhaven/enhancements";
import { games } from "@/loaders/gloomhaven/games";
import { itemGroups } from "@/loaders/gloomhaven/item-groups";
import { items } from "@/loaders/gloomhaven/items";
import { personalQuests } from "@/loaders/gloomhaven/personal-quests";
import { toCharacterClassSummary } from "@/transformers/character-class-summary";
import { toUnlockableCharacterClassSummary } from "@/transformers/unlockable-character-class-summary";

const gloomhaven: Game = games[0];

const getGloomhavenGameData = (): GameData => {
    return {
        game: gloomhaven,
        initialCharacterClasses: createCharacterClassSummaries(characterClasses),
        unlockableCharacterClasses: createUnlockableCharacterClassSummaries(characterClasses),
        personalQuests,
        enhancements,
        baseAttackModifierDeck: createBaseAttackModifierDeck(),
        battleGoalCheckmarks: createDefaultBattleGoals(),
        itemGroups,
        defaultCharacter: createDefaultCharacter(),
    };
};

const createCharacterClassSummaries = (characterClasses: CharacterClass[]): CharacterClassSummary[] => {
    return characterClasses
        .filter((characterClass: CharacterClass) => !characterClass.initiallyLocked)
        .map((characterClass: CharacterClass) => toCharacterClassSummary(characterClass));
};

const createUnlockableCharacterClassSummaries = (
    characterClasses: CharacterClass[]
): UnlockableCharacterClassSummary[] => {
    return characterClasses
        .filter((characterClass: CharacterClass) => characterClass.initiallyLocked)
        .map((characterClass: CharacterClass) => toUnlockableCharacterClassSummary(characterClass));
};

const createDefaultCharacter = (): Character => {
    return {
        name: "",
        experience: 0,
        gold: 0,
        notes: "",
        characterClass: characterClasses[0],
        unlockedAbilityCards: [],
        hand: [],
        gainedEnhancements: [],
        gainedPerks: [],
        battleGoalCheckmarkGroups: createDefaultBattleGoals(),
        items: [],
    };
};

const createBaseAttackModifierDeck = (): AttackModifierDeckCard[] => {
    return [
        {
            card: attackModifiers[0], // 2x
            count: 1,
        },
        {
            card: attackModifiers[1], // +2
            count: 1,
        },
        {
            card: attackModifiers[2], // +1
            count: 5,
        },
        {
            card: attackModifiers[3], // +0
            count: 6,
        },
        {
            card: attackModifiers[4], // -1
            count: 5,
        },
        {
            card: attackModifiers[5], // -2
            count: 1,
        },
        {
            card: attackModifiers[6], // Miss
            count: 1,
        },
    ];
};

const createDefaultBattleGoals = (): BattleGoalCheckmarkGroup[] => {
    return Array.from<BattleGoalCheckmarkGroup>({ length: 6 }).map((item: unknown, groupIndex: number) => ({
        id: groupIndex,
        checkmarks: Array.from<BattleGoalCheckmark>({ length: 3 }).map((item: unknown, checkmarkIndex: number) => ({
            id: checkmarkIndex,
            value: false,
        })),
    }));
};

const getGloomhavenCharacterClassData = (): CharacterClassData => {
    return {
        game: gloomhaven,
        classes: characterClasses,
    };
};

const getGloomhavenItemData = (): ItemData => {
    return {
        game: gloomhaven,
        items,
    };
};

export { getGloomhavenGameData, getGloomhavenCharacterClassData, getGloomhavenItemData };
