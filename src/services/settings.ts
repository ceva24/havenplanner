import { games } from "@/loaders/games";
import { itemGroups } from "@/loaders/item-groups";
import { characterClasses } from "@/loaders/character-classes";
import { createDefaultBattleGoals } from "@/services/perks/battle-goal";

const getDefaultSettings = (): Settings => {
    return {
        gameSettings: getDefaultGameSettings(),
        showPersonalQuest: false,
        selectedAbilityCardsTabIndex: 0,
        spoilerSettings: getDefaultSpoilerSettings(),
    };
};

const getDefaultGameSettings = (): GameSettings => {
    return {
        game: games[0],
        itemGroups,
        defaultCharacter: getDefaultCharacter(),
    };
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

const getDefaultSpoilerSettings = (): SpoilerSettings => {
    return {
        items: {
            prosperity: 1,
            itemGroups: [],
        },
    };
};

const itemGroupIsActive = (itemGroup: ItemGroup, settings: Settings) => {
    return settings.spoilerSettings.items.itemGroups.some((group) => group.id === itemGroup.id);
};

export { getDefaultSettings, itemGroupIsActive };
