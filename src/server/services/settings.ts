import { getGameDataById } from "@/server/services/games/game";
import { toUnlockableCharacterClassSummary } from "@/server/transformers/unlockable-character-class-summary";

const getDefaultSettings = (): Settings => {
    return getSettingsForGame(1);
};

const getSettingsForGame = (id: number): Settings => {
    const gameData: GameData = getGameDataById(id);

    return {
        gameData,
        spoilerSettings: getDefaultSpoilerSettings(),
        userSettings: getDefaultUserSettings(),
    };
};

const getDefaultSpoilerSettings = (): SpoilerSettings => {
    return {
        classes: [],
        items: {
            prosperity: 1,
            itemGroups: [],
        },
    };
};

const getDefaultUserSettings = (): UserSettings => {
    return {
        showPersonalQuest: false,
        selectedAbilityCardsTabIndex: 0,
        filteredItemSlots: [],
    };
};

const getSpoilerSettingsForCharacter = (character: Character, gameData: GameData): SpoilerSettings => {
    return {
        classes: determineUnlockedClasses(character),
        items: {
            prosperity: determineInitialProsperity(character),
            itemGroups: determineItemGroups(character, gameData),
        },
    };
};

const determineUnlockedClasses = (character: Character): UnlockableCharacterClassSummary[] => {
    return character.characterClass.initiallyLocked
        ? [toUnlockableCharacterClassSummary(character.characterClass)]
        : [];
};

const determineInitialProsperity = (character: Character): number => {
    if (character.items.length === 0) return 1;

    const itemProsperities: number[] = character.items
        .filter((characterItem: CharacterItem) => !Number.isNaN(Number(characterItem.item.group)))
        .map((characterItem: CharacterItem) => Number.parseInt(characterItem.item.group, 10));

    return Math.max(...itemProsperities.concat(1));
};

const determineItemGroups = (character: Character, gameData: GameData): ItemGroup[] => {
    const itemGroupNames: string[] = character.items.map((characterItem: CharacterItem) => characterItem.item.group);
    const uniqueItemGroupNames = new Set<string>(itemGroupNames);

    return gameData.itemGroups.filter((itemGroup: ItemGroup) => uniqueItemGroupNames.has(itemGroup.name));
};

export { getDefaultSettings, getSettingsForGame, getSpoilerSettingsForCharacter };
