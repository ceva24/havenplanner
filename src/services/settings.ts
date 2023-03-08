import { getGameDataById } from "@/services/games/game";

const getDefaultSettings = (): Settings => {
    return getSettingsForGame(1);
};

const getSettingsForGame = (id: number) => {
    return {
        gameData: getGameDataById(id),
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

const getSpoilerSettingsForCharacter = (character: Character, gameData: GameData): SpoilerSettings => {
    return {
        items: {
            prosperity: determineInitialProsperity(character),
            itemGroups: determineItemGroups(character, gameData),
        },
    };
};

const determineInitialProsperity = (character: Character): number => {
    if (character.items.length === 0) return 1;

    const itemProsperities: number[] = character.items
        .filter((characterItem: CharacterItem) => !Number.isNaN(Number(characterItem.item.group)))
        .map((characterItem: CharacterItem) => Number.parseInt(characterItem.item.group, 10));

    return Math.max.apply(0, itemProsperities);
};

const determineItemGroups = (character: Character, gameData: GameData): ItemGroup[] => {
    const itemGroupNames: string[] = character.items.map((characterItem: CharacterItem) => characterItem.item.group);
    const uniqueItemGroupNames = new Set<string>(itemGroupNames);

    return gameData.itemGroups.filter((itemGroup: ItemGroup) => uniqueItemGroupNames.has(itemGroup.name));
};

export { getDefaultSettings, getSettingsForGame, getSpoilerSettingsForCharacter };
