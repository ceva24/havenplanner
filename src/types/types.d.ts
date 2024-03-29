type CharacterClassSummary = Pick<CharacterClass, "id" | "name" | "imageUrl">;

type UnlockableCharacterClassSummary = Pick<CharacterClass, "id" | "spoilerSafeName" | "imageUrl">;

interface Settings {
    gameData: GameData;
    spoilerSettings: SpoilerSettings;
    userSettings: UserSettings;
}

interface GameData {
    game: Game;
    initialCharacterClasses: CharacterClassSummary[];
    unlockableCharacterClasses: UnlockableCharacterClassSummary[];
    personalQuests: PersonalQuest[];
    enhancements: Enhancement[];
    baseAttackModifierDeck: AttackModifierDeckCard[];
    battleGoalCheckmarks: BattleGoalCheckmarkGroup[];
    itemGroups: ItemGroup[];
    itemSlots: ItemSlot[];
    defaultCharacter: Character;
}

interface SpoilerSettings {
    classes: UnlockableCharacterClassSummary[];
    items: ItemSpoilerSettings;
}

interface UserSettings {
    showPersonalQuest: boolean;
    selectedAbilityCardsTabIndex: number;
    filteredItemSlots: ItemSlot[];
}

interface ItemSpoilerSettings {
    prosperity: number;
    itemGroups: ItemGroup[];
}

interface CharacterClassData {
    game: Game;
    classes: CharacterClass[];
}

interface ItemData {
    game: Game;
    items: Item[];
}

interface Character {
    name: string;
    experience: number;
    gold: number;
    notes: string;
    characterClass: CharacterClass;
    personalQuest?: PersonalQuest;
    unlockedAbilityCards: AbilityCard[];
    hand: AbilityCard[];
    gainedEnhancements: GainedEnhancement[];
    gainedPerks: GainedPerk[];
    battleGoalCheckmarkGroups: BattleGoalCheckmarkGroup[];
    items: CharacterItem[];
}

interface GainedEnhancement {
    abilityCard: AbilityCard;
    enhancementSlot: EnhancementSlot;
    enhancement: Enhancement;
}

interface GainedPerk {
    perk: Perk;
    checkboxIndex: number;
}

interface AttackModifierDeckCard {
    card: AttackModifierCard;
    count: number;
}

interface BattleGoalCheckmarkGroup {
    id: number;
    checkmarks: BattleGoalCheckmark[];
}

interface BattleGoalCheckmark {
    id: number;
    value: boolean;
}

interface CharacterItem {
    id: string;
    item: Item;
    showAlternativeImage: boolean;
}

interface SaveData {
    character: Character;
    gameData: GameData;
}

interface SerializedCharacter {
    a: number; // Game id
    n: string; // Name
    x: number; // Experience
    g: number; // Gold
    d: string; // Notes
    c: number; // Character id
    q?: number; // Personal quest id
    i: Array<[number, boolean]>; // Item ids and show alternative image values
    u: number[]; // Unlocked ability card ids
    h: number[]; // Hand ability card ids
    e: Array<[number, number, number]>; // Gained enhancement ability card id, slot id and enhancement id
    p: Array<[number, number]>; // Gained perk and checkbox indices
    b: boolean[][]; // Gained battle goal checkmark groups
}
