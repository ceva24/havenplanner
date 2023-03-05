import { getGameData } from "@/services/game/gloomhaven";

const getDefaultSettings = (): Settings => {
    return {
        gameData: getGameData(),
        showPersonalQuest: false,
        selectedAbilityCardsTabIndex: 0,
        spoilerSettings: getDefaultSpoilerSettings(),
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
