import { attackModifiers } from "@/loaders/attack-modifiers";
import { characterClasses } from "@/loaders/character-classes";
import { enhancements } from "@/loaders/enhancements";
import { games } from "@/loaders/games";
import { itemGroups } from "@/loaders/item-groups";
import { items } from "@/loaders/items";
import { personalQuests } from "@/loaders/personal-quests";
import { tounlockableCharacterClassSummary } from "@/transformers/character";

const getGloomhavenGameData = (): GameData => {
    return {
        game: games[0],
        characterClasses,
        unlockableCharacterClasses: unlockableCharacterClasses(characterClasses),
        personalQuests,
        enhancements,
        baseAttackModifierDeck: createBaseAttackModifierDeck(),
        battleGoalCheckmarks: createDefaultBattleGoals(),
        items,
        itemGroups,
        defaultCharacter: getDefaultCharacter(),
    };
};

const unlockableCharacterClasses = (characterClasses: CharacterClass[]): UnlockableCharacterClassSummary[] => {
    return characterClasses
        .filter((characterClass: CharacterClass) => characterClass.initiallyLocked)
        .map((characterClass: CharacterClass) => tounlockableCharacterClassSummary(characterClass));
};

const getDefaultCharacter = (): Character => {
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

export { getGloomhavenGameData };
